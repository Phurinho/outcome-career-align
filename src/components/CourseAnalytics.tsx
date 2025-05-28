
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Download, Filter, BarChart3 } from "lucide-react";

interface CourseAnalyticsProps {
  role: 'admin' | 'educator' | 'student';
}

const CourseAnalytics = ({ role }: CourseAnalyticsProps) => {
  const careerCoverageData = [
    { career: 'Software Dev', coverage: 94, fullMark: 100 },
    { career: 'Data Analyst', coverage: 87, fullMark: 100 },
    { career: 'Web Dev', coverage: 91, fullMark: 100 },
    { career: 'DB Admin', coverage: 83, fullMark: 100 },
    { career: 'UI/UX', coverage: 76, fullMark: 100 },
    { career: 'DevOps', coverage: 69, fullMark: 100 }
  ];

  const unitCoverageData = [
    { unitCode: 'ICT001', coverage: 92, career: 'Software Dev' },
    { unitCode: 'ICT008', coverage: 95, career: 'Web Dev' },
    { unitCode: 'ICT015', coverage: 88, career: 'DB Admin' },
    { unitCode: 'ICT022', coverage: 84, career: 'Data Analyst' },
    { unitCode: 'ICT031', coverage: 79, career: 'UI/UX' },
    { unitCode: 'ICT045', coverage: 72, career: 'DevOps' }
  ];

  const coursePerformance = [
    { course: "Data Structures", avgCoverage: 92, cloCount: 4, topCareer: "Software Developer" },
    { course: "Web Development", avgCoverage: 91, cloCount: 5, topCareer: "Web Developer" },
    { course: "Database Systems", avgCoverage: 88, cloCount: 3, topCareer: "Database Admin" },
    { course: "Data Mining", avgCoverage: 85, cloCount: 4, topCareer: "Data Analyst" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Analytics</h2>
          <p className="text-gray-600">Comprehensive analysis of CLO-TPQI alignment and career coverage</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all-courses">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-courses">All Courses</SelectItem>
              <SelectItem value="data-structures">Data Structures</SelectItem>
              <SelectItem value="web-dev">Web Development</SelectItem>
              <SelectItem value="database">Database Systems</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Overall Coverage", value: "89%", change: "+3.2%", positive: true },
          { title: "Top Career Match", value: "Software Dev", change: "94% coverage", positive: true },
          { title: "Mapped Units", value: "67", change: "+12 this month", positive: true },
          { title: "Avg Confidence", value: "87%", change: "+1.8%", positive: true }
        ].map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.positive ? 'text-emerald-600' : 'text-red-600'} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {metric.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Coverage Spider Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Career Coverage Analysis</CardTitle>
            <CardDescription>
              Spider chart showing coverage across different career paths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={careerCoverageData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="career" className="text-sm" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={false}
                />
                <Radar
                  name="Coverage %"
                  dataKey="coverage"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Unit Coverage Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>TPQI Unit Coverage</CardTitle>
            <CardDescription>
              Coverage percentage by TPQI unit codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={unitCoverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unitCode" className="text-sm" />
                <YAxis domain={[0, 100]} />
                <Bar dataKey="coverage" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Course Performance Summary
          </CardTitle>
          <CardDescription>
            Detailed breakdown of each course's TPQI alignment performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coursePerformance.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{course.course}</h3>
                    <Badge variant="secondary">{course.cloCount} CLOs</Badge>
                    <Badge variant="outline">{course.topCareer}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Average Coverage:</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${course.avgCoverage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{course.avgCoverage}%</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Career Path Insights (for student role) */}
      {role === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle>Your Career Path Insights</CardTitle>
            <CardDescription>
              Based on your completed courses, here are your strongest career alignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { career: "Software Developer", match: 94, courses: ["Data Structures", "Algorithms"] },
                { career: "Web Developer", match: 91, courses: ["Web Development", "Frontend Design"] },
                { career: "Data Analyst", match: 87, courses: ["Data Mining", "Statistics"] }
              ].map((path, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  <h4 className="font-semibold text-gray-900 mb-2">{path.career}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{path.match}%</div>
                  <div className="space-y-1">
                    {path.courses.map((course, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-1">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseAnalytics;
