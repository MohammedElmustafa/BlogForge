import dynamicImport from "next/dynamic";
export const dynamic = "force-dynamic";

export const revalidate = 0;

import prisma from "@/app/utils/db";

// Client-only charts
const StatisticsChart = dynamicImport(
  () => import("../../components/admindashboard/StatisticsChart"),
  { ssr: false }
);
const TrendsChart = dynamicImport(
  () => import("../../components/admindashboard/TrendsChart"),
  { ssr: false }
);

function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function AdminDashboardPage() {
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
    prisma.subscription.count({ where: { status: "active" } }),
    prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    prisma.post.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  const monthlyPrice = 9;
  const currentMRR = activeSubscriptionsCount * monthlyPrice;

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // labels and raw data
  const monthLabels: Date[] = Array.from({ length: 6 }, (_, i) =>
    new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
  );

  const [usersLastSix, postsLastSix, subscriptionsLastSix] = await Promise.all([
    prisma.user.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.post.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.subscription.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
  ]);

  const countByMonth = (items: { createdAt: Date }[]) => {
    const map: Record<string, number> = {};
    monthLabels.forEach(d => (map[formatMonth(d)] = 0));
    items.forEach(i => {
      const key = formatMonth(new Date(i.createdAt));
      if (map[key] !== undefined) map[key]++;
    });
    return map;
  };

  const userCounts = countByMonth(usersLastSix);
  const postCounts = countByMonth(postsLastSix);
  const subCounts = countByMonth(subscriptionsLastSix);

  const trendsData = monthLabels.map(d => ({
    month: formatMonth(d),
    users: userCounts[formatMonth(d)],
    posts: postCounts[formatMonth(d)],
  }));

  const subscriptionTrends = monthLabels.map(d => ({
    month: formatMonth(d),
    subscriptions: subCounts[formatMonth(d)],
  }));

  const last = subscriptionTrends.length - 1;
  const predictedNewSubs =
    subscriptionTrends[last].subscriptions -
    (subscriptionTrends[last - 1]?.subscriptions || 0);
  const predictedMRR = (activeSubscriptionsCount + predictedNewSubs) * monthlyPrice;

  const chartData = [
    { name: "Users", value: usersCount },
    { name: "Posts", value: postsCount },
    { name: "Sites", value: sitesCount },
    { name: "Messages", value: messagesCount },
    { name: "Subscriptions", value: subscriptionsCount },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Overview of key metrics, growth trends, and financial predictions
        </p>
      </header>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          ["Total Users", usersCount],
          ["Total Posts", postsCount],
          ["Total Sites", sitesCount],
          ["Total Messages", messagesCount],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 shadow dark:shadow-black/20 rounded-lg p-6"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          ["New Users (Last 7 Days)", newUsersCount, "green"],
          ["New Posts (Last 7 Days)", newPostsCount, "green"],
          ["Active Subscriptions", activeSubscriptionsCount, "indigo"],
        ].map(([label, value, accent]) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 shadow dark:shadow-black/20 rounded-lg p-6"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <p
              className={`text-3xl font-bold text-${accent}-600 dark:text-${accent}-400`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          ["Current MRR", `$${currentMRR}`],
          ["Predicted Next Month MRR", `$${predictedMRR}`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 shadow dark:shadow-black/20 rounded-lg p-6"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-800 shadow dark:shadow-black/20 rounded-lg p-6 mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Overall Metrics Overview
        </h2>
        <StatisticsChart data={chartData} />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow dark:shadow-black/20 rounded-lg p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Growth Trends (Last 6 Months)
        </h2>
        <TrendsChart data={trendsData} />
        <div className="mt-4 space-y-2">
          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Predicted Next Month Users:</span>{" "}
            {trendsData[last].users -
              (trendsData[last - 1]?.users || 0) +
              trendsData[last].users}
          </p>

          <p className="text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Predicted Next Month Posts:</span>{" "}
            {trendsData[last].posts -
              (trendsData[last - 1]?.posts || 0) +
              trendsData[last].posts}
          </p>
        </div>
      </div>
    </div>
  );
}
