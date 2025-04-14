import dynamicImport from "next/dynamic";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/app/utils/db";

// Dynamically import chart components (client-side only)
const StatisticsChart = dynamicImport(
  () => import("../../components/admindashboard/StatisticsChart"),
  { ssr: false }
);
const TrendsChart = dynamicImport(
  () => import("../../components/admindashboard/TrendsChart"),
  { ssr: false }
);

// Helper function to format a date as "Mon YYYY"
function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function AdminDashboardPage() {
  // Fetch basic metrics concurrently inside a transaction to share one connection
  const [
    usersCount,
    postsCount,
    sitesCount,
    messagesCount,
    subscriptionsCount,
    activeSubscriptionsCount,
    newUsersCount,
    newPostsCount,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.post.count(),
    prisma.site.count(),
    prisma.contactMessage.count(),
    prisma.subscription.count(),
    prisma.subscription.count({
      where: { status: "active" },
    }),
    prisma.user.count({
      where: {
        createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
      },
    }),
    prisma.post.count({
      where: {
        createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
      },
    }),
  ]);

  // Set an average monthly price (USD) per subscription
  const monthlyPrice = 9;
  const currentMRR = activeSubscriptionsCount * monthlyPrice;

  // Set up date ranges for trends (last 6 months)
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Generate month labels for the last six months
  const monthLabels: Date[] = [];
  for (let i = 0; i < 6; i++) {
    monthLabels.push(new Date(now.getFullYear(), now.getMonth() - 5 + i, 1));
  }

  // --- Users and Posts Trends ---
  const usersLastSix = await prisma.user.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
  });

  const postsLastSix = await prisma.post.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
  });

  // Group counts by month for users and posts
  const userCountsByMonth: Record<string, number> = {};
  const postCountsByMonth: Record<string, number> = {};
  monthLabels.forEach((d) => {
    const key = formatMonth(d);
    userCountsByMonth[key] = 0;
    postCountsByMonth[key] = 0;
  });

  usersLastSix.forEach((user) => {
    const key = formatMonth(new Date(user.createdAt));
    if (key in userCountsByMonth) {
      userCountsByMonth[key]++;
    }
  });

  postsLastSix.forEach((post) => {
    const key = formatMonth(new Date(post.createdAt));
    if (key in postCountsByMonth) {
      postCountsByMonth[key]++;
    }
  });

  const trendsData = monthLabels.map((d) => {
    const key = formatMonth(d);
    return {
      month: key,
      users: userCountsByMonth[key] ?? 0,
      posts: postCountsByMonth[key] ?? 0,
    };
  });

  // --- Financial (Subscription) Trends ---
  const subscriptionsLastSix = await prisma.subscription.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
  });

  const subscriptionCountsByMonth: Record<string, number> = {};
  monthLabels.forEach((d) => {
    const key = formatMonth(d);
    subscriptionCountsByMonth[key] = 0;
  });
  subscriptionsLastSix.forEach((sub) => {
    const key = formatMonth(new Date(sub.createdAt));
    if (key in subscriptionCountsByMonth) {
      subscriptionCountsByMonth[key]++;
    }
  });

  // Prepare a trends array for subscriptions
  const subscriptionTrends = monthLabels.map((d) => {
    const key = formatMonth(d);
    return {
      month: key,
      subscriptions: subscriptionCountsByMonth[key] ?? 0,
    };
  });

  // Simple prediction for new subscriptions based on the last two months
  const lastMonthSubData = subscriptionTrends[subscriptionTrends.length - 1];
  const secondLastMonthSubData = subscriptionTrends[subscriptionTrends.length - 2] || { subscriptions: 0 };
  const predictedNewSubscriptions = lastMonthSubData.subscriptions + (lastMonthSubData.subscriptions - secondLastMonthSubData.subscriptions);

  // Predicted MRR for next month
  const predictedMRR = (activeSubscriptionsCount + predictedNewSubscriptions) * monthlyPrice;

  // Data for the overall overview chart
  const chartData = [
    { name: "Users", value: usersCount },
    { name: "Posts", value: postsCount },
    { name: "Sites", value: sitesCount },
    { name: "Messages", value: messagesCount },
    { name: "Subscriptions", value: subscriptionsCount },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of key metrics, growth trends, and financial predictions
          </p>
        </header>

        {/* Primary Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-indigo-600">{usersCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Posts</h2>
            <p className="text-3xl font-bold text-indigo-600">{postsCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Sites</h2>
            <p className="text-3xl font-bold text-indigo-600">{sitesCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Messages</h2>
            <p className="text-3xl font-bold text-indigo-600">{messagesCount}</p>
          </div>
        </div>

        {/* Additional Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">New Users (Last 7 Days)</h2>
            <p className="text-3xl font-bold text-green-600">{newUsersCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">New Posts (Last 7 Days)</h2>
            <p className="text-3xl font-bold text-green-600">{newPostsCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Active Subscriptions</h2>
            <p className="text-3xl font-bold text-indigo-600">{activeSubscriptionsCount}</p>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Current MRR</h2>
            <p className="text-3xl font-bold text-indigo-600">${currentMRR}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Predicted Next Month MRR</h2>
            <p className="text-3xl font-bold text-indigo-600">${predictedMRR}</p>
          </div>
        </div>
        {/* Overview Chart Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Metrics Overview</h2>
          <StatisticsChart data={chartData} />
        </div>
        {/* Growth Trends and Financial Predictions Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Growth Trends (Last 6 Months)</h2>
          <TrendsChart data={trendsData} />
          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">Predicted Next Month Users:</span> {trendsData[trendsData.length - 1].users + (trendsData[trendsData.length - 1].users - (trendsData[trendsData.length - 2]?.users || 0))}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Predicted Next Month Posts:</span> {trendsData[trendsData.length - 1].posts + (trendsData[trendsData.length - 1].posts - (trendsData[trendsData.length - 2]?.posts || 0))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
