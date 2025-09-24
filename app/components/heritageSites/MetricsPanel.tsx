import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import { TrendingUp, Globe, Users, Database, Shield, FileText, Calendar } from 'lucide-react';

interface CulturalSite {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration';
  language?: string;
  tribe?: string;
  images: string[];
  videos: string[];
  audio: string[];
  metadata: {
    unesco: boolean;
    undp: boolean;
    unicef: boolean;
    localContext: string;
    indigenousSystem: string;
    rights: string;
    ipMetadata: string;
    sensitivityLevel: 'public' | 'restricted' | 'closed';
    accessProtocol: string;
  };
  populationDensity?: number;
  migrationRoute?: string;
  dateCreated: string;
  lastUpdated: string;
}

interface MetricsPanelProps {
  sites: CulturalSite[];
  stats: {
    totalSites: number;
    publicSites: number;
    restrictedSites: number;
    closedSites: number;
    unescoSites: number;
    undpSites: number;
    unicefSites: number;
    categories: {
      heritage: number;
      language: number;
      botanical: number;
      tribal: number;
      migration: number;
    };
    languages: number;
    tribes: number;
  };
}

export function MetricsPanel({ sites, stats }: MetricsPanelProps) {
  // Prepare data for charts
  const categoryData = Object.entries(stats.categories).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    count,
    percentage: ((count / stats.totalSites) * 100).toFixed(1),
  }));

  const accessLevelData = [
    { name: 'Public', value: stats.publicSites, color: '#10B981' },
    { name: 'Restricted', value: stats.restrictedSites, color: '#F59E0B' },
    { name: 'Closed', value: stats.closedSites, color: '#EF4444' },
  ];

  const standardsComplianceData = [
    { name: 'UNESCO', value: stats.unescoSites, total: stats.totalSites },
    { name: 'UNDP', value: stats.undpSites, total: stats.totalSites },
    { name: 'UNICEF', value: stats.unicefSites, total: stats.totalSites },
  ];

  // Monthly addition trend (mock data for demonstration)
  const monthlyTrend = [
    { month: 'Jan', sites: 5 },
    { month: 'Feb', sites: 8 },
    { month: 'Mar', sites: 12 },
    { month: 'Apr', sites: 15 },
    { month: 'May', sites: 18 },
    { month: 'Jun', sites: 22 },
  ];

  // Language distribution
  const languageDistribution = [...new Set(sites.map(site => site.language).filter(Boolean))]
    .map(language => ({
      language,
      count: sites.filter(site => site.language === language).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Quality</p>
                <p className="text-2xl font-bold text-green-600">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Complete metadata coverage</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">International Standards</p>
                <p className="text-2xl font-bold text-blue-600">{stats.unescoSites + stats.undpSites + stats.unicefSites}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Sites with standards compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cultural Diversity</p>
                <p className="text-2xl font-bold text-purple-600">{stats.languages + stats.tribes}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Languages & tribal groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Multimedia Assets</p>
                <p className="text-2xl font-bold text-amber-600">
                  {sites.reduce((total, site) => total + site.images.length + site.videos.length + site.audio.length, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-amber-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Images, videos, audio files</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Site Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Access Level Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Access Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accessLevelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                >
                  {accessLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Site Addition Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sites" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Languages Represented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageDistribution.map((item, index) => (
                <div key={item.language} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item.language}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20">
                      <Progress value={(item.count / stats.totalSites) * 100} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[2rem]">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standards Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>International Standards Compliance</CardTitle>
          <p className="text-sm text-gray-600">
            Percentage of sites meeting various international metadata standards
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standardsComplianceData.map(standard => {
              const percentage = (standard.value / standard.total) * 100;
              return (
                <div key={standard.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{standard.name}</span>
                    <span className="text-sm text-gray-600">
                      {standard.value}/{standard.total} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Compliant Sites</span>
                    <span>{standard.value} sites</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sites
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .slice(0, 5)
              .map(site => (
                <div key={site.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="capitalize">
                      {site.category}
                    </Badge>
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-gray-600">{site.tribe || site.language || 'General'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Updated</p>
                    <p className="text-sm font-medium">{site.lastUpdated}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}