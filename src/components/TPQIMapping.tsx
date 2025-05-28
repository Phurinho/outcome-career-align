
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, BookOpen, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TPQIMappingProps {
  role: 'admin' | 'educator' | 'student';
}

const TPQIMapping = ({ role }: TPQIMappingProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockMappings = [
    {
      cloId: "CLO001",
      course: "Data Structures",
      cloDescription: "Apply advanced sorting algorithms",
      unitCode: "ICT001",
      career: "Software Developer",
      level: "Level 5",
      unitTitle: "Algorithm Implementation",
      confidence: 92,
      status: "confirmed"
    },
    {
      cloId: "CLO002", 
      course: "Database Systems",
      cloDescription: "Design normalized database schemas",
      unitCode: "ICT015",
      career: "Database Administrator", 
      level: "Level 4",
      unitTitle: "Database Design & Optimization",
      confidence: 88,
      status: "pending"
    },
    {
      cloId: "CLO003",
      course: "Web Development", 
      cloDescription: "Create responsive web applications",
      unitCode: "ICT008",
      career: "Web Developer",
      level: "Level 4", 
      unitTitle: "Web Application Development",
      confidence: 95,
      status: "confirmed"
    }
  ];

  const pendingMappings = mockMappings.filter(m => m.status === "pending");

  const handleAIMapping = () => {
    toast({
      title: "AI Mapping Initiated",
      description: "The AI system is analyzing CLOs and finding TPQI matches...",
    });
  };

  const handleApproveMapping = (cloId: string) => {
    toast({
      title: "Mapping Approved",
      description: `CLO ${cloId} mapping has been approved and saved.`,
    });
  };

  const canManage = role === 'admin' || role === 'educator';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">TPQI Mapping</h2>
          <p className="text-gray-600">AI-powered mapping of CLOs to TPQI professional standards</p>
        </div>
        {canManage && (
          <Button onClick={handleAIMapping} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
            <Zap className="h-4 w-4" />
            Run AI Mapping
          </Button>
        )}
      </div>

      <Tabs defaultValue="all-mappings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-mappings">All Mappings</TabsTrigger>
          <TabsTrigger value="pending-review">
            Pending Review
            {pendingMappings.length > 0 && (
              <Badge className="ml-2 bg-orange-500">{pendingMappings.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="all-mappings" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search mappings by CLO, course, or career..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Mappings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                CLO ↔ TPQI Mappings
              </CardTitle>
              <CardDescription>
                Current mappings between Course Learning Outcomes and TPQI units
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CLO</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>TPQI Unit</TableHead>
                    <TableHead>Career</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Status</TableHead>
                    {canManage && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMappings.map((mapping, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{mapping.cloId}</div>
                          <div className="text-sm text-gray-500 truncate max-w-40">
                            {mapping.cloDescription}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{mapping.course}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{mapping.unitCode}</div>
                          <div className="text-sm text-gray-500">{mapping.unitTitle}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{mapping.career}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{mapping.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={mapping.confidence} className="w-16 h-2" />
                          <span className="text-sm font-medium">{mapping.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {mapping.status === "confirmed" ? (
                          <Badge className="bg-emerald-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      {canManage && (
                        <TableCell>
                          {mapping.status === "pending" ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveMapping(mapping.cloId)}
                            >
                              Approve
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">Edit</Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-review">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Pending Review</CardTitle>
              <CardDescription>
                AI-generated mappings awaiting human approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingMappings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
                  <p>All mappings have been reviewed!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMappings.map((mapping, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <Badge>{mapping.cloId}</Badge>
                            <span className="font-medium">{mapping.course}</span>
                            <Badge variant="outline">{mapping.unitCode}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{mapping.cloDescription}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Career: {mapping.career}</span>
                            <span className="text-sm text-gray-500">Level: {mapping.level}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={mapping.confidence} className="w-16 h-2" />
                              <span className="text-sm font-medium">{mapping.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        {canManage && (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleApproveMapping(mapping.cloId)}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm">Reject</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-suggestions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                AI Mapping Suggestions
              </CardTitle>
              <CardDescription>
                Smart recommendations for unmapped CLOs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Zap className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <p className="mb-4">Click "Run AI Mapping" to generate new suggestions</p>
                {canManage && (
                  <Button onClick={handleAIMapping} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Suggestions
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TPQIMapping;
