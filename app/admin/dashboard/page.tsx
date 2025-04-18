import prisma from '@/app/utils/db';
import DashboardCharts from '@/app/components/admindashboard/DashboardCharts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default async function AdminDashboardPage() {
  // Fetch counts and recent-week data in one transaction
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
    prisma.subscription.count({ where: { status: 'active' } }),
    prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    prisma.post.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  const monthlyPrice = 9;
  const currentMRR = activeSubscriptionsCount * monthlyPrice;

  // Prepare 6‑month trend data
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const monthLabels: Date[] = Array.from(
    { length: 6 },
    (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
  );

  // Fetch all items created in the last six months
  const [usersLastSix, postsLastSix, subscriptionsLastSix] = await Promise.all([
    prisma.user.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.post.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.subscription.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
  ]);

  // Count helper
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

  // Build chart data
  const chartData = [
    { name: 'Users', value: usersCount },
    { name: 'Posts', value: postsCount },
    { name: 'Sites', value: sitesCount },
    { name: 'Messages', value: messagesCount },
    { name: 'Subscriptions', value: subscriptionsCount },
  ];

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
          ['Total Users', usersCount],
          ['Total Posts', postsCount],
          ['Total Sites', sitesCount],
          ['Total Messages', messagesCount],
        ].map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
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
          ['New Users (Last 7 Days)', newUsersCount],
          ['New Posts (Last 7 Days)', newPostsCount],
          ['Active Subscriptions', activeSubscriptionsCount],
        ].map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          ['Current MRR', `$${currentMRR}`],
          ['Predicted Next Month MRR', `$${predictedMRR}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              {label}
            </h2>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Client‑only Charts */}
      <DashboardCharts chartData={chartData} trendsData={trendsData} />
    </div>
  );
}