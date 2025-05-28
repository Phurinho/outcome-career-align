
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, GraduationCap, Users, BarChart3, Target, BookOpen } from "lucide-react";
import CLOManagement from "@/components/CLOManagement";
import TPQIMapping from "@/components/TPQIMapping";
import CourseAnalytics from "@/components/CourseAnalytics";
import RoleSelector from "@/components/RoleSelector";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'educator' | 'student'>('admin');

  const stats = [
    {
      title: "Total CLOs",
      value: "142",
      description: "Across all courses",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      title: "TPQI Units",
      value: "89",
      description: "Career standards mapped",
      icon: BookOpen,
      color: "bg-emerald-500"
    },
    {
      title: "Coverage Rate",
      value: "87%",
      description: "Average mapping confidence",
      icon: BarChart3,
      color: "bg-purple-500"
    },
    {
      title: "Active Courses",
      value: "24",
      description: "With CLO mappings",
      icon: GraduationCap,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                CLO ↔ TPQI Mapping System
              </h1>
              <p className="text-xl text-gray-600">
                AI-powered alignment of Course Learning Outcomes with Professional Standards
              </p>
            </div>
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clo-management">CLO Management</TabsTrigger>
            <TabsTrigger value="tpqi-mapping">TPQI Mapping</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Recent CLO Mappings
                  </CardTitle>
                  <CardDescription>
                    Latest Course Learning Outcome alignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { course: "Data Structures", clo: "Apply algorithms", confidence: 92, career: "Software Developer" },
                      { course: "Database Systems", clo: "Design databases", confidence: 88, career: "Database Administrator" },
                      { course: "Web Development", clo: "Create web apps", confidence: 95, career: "Web Developer" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.course}</p>
                          <p className="text-sm text-gray-600">{item.clo}</p>
                          <Badge variant="secondary" className="mt-1">{item.career}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600">{item.confidence}%</div>
                          <div className="text-xs text-gray-500">Confidence</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Career Coverage Summary
                  </CardTitle>
                  <CardDescription>
                    Professional qualification alignment overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { career: "Software Developer", coverage: 94, units: 12 },
                      { career: "Data Analyst", coverage: 87, units: 8 },
                      { career: "Web Developer", coverage: 91, units: 10 },
                      { career: "Database Admin", coverage: 83, units: 6 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{item.career}</span>
                          <span className="text-sm text-gray-600">{item.units} units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.coverage}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm font-medium text-gray-700">
                          {item.coverage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clo-management">
            <CLOManagement role={selectedRole} />
          </TabsContent>

          <TabsContent value="tpqi-mapping">
            <TPQIMapping role={selectedRole} />
          </TabsContent>

          <TabsContent value="analytics">
            <CourseAnalytics role={selectedRole} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
