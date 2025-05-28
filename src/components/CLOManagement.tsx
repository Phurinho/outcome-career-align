
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, FileText, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CLOManagementProps {
  role: 'admin' | 'educator' | 'student';
}

const CLOManagement = ({ role }: CLOManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const mockCLOs = [
    {
      id: "CLO001",
      course: "Data Structures & Algorithms",
      description: "Apply advanced sorting and searching algorithms to solve computational problems",
      weight: 25,
      plo: "PLO1",
      mappedUnits: 3,
      avgConfidence: 92
    },
    {
      id: "CLO002", 
      course: "Database Systems",
      description: "Design and implement relational database schemas with normalization",
      weight: 30,
      plo: "PLO2",
      mappedUnits: 5,
      avgConfidence: 88
    },
    {
      id: "CLO003",
      course: "Web Development",
      description: "Create responsive web applications using modern frameworks",
      weight: 35,
      plo: "PLO3", 
      mappedUnits: 4,
      avgConfidence: 95
    }
  ];

  const handleAddCLO = () => {
    toast({
      title: "CLO Added Successfully",
      description: "The new Course Learning Outcome has been added to the system.",
    });
    setShowAddForm(false);
  };

  const canEdit = role === 'admin' || role === 'educator';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CLO Management</h2>
          <p className="text-gray-600">Manage Course Learning Outcomes and their weights</p>
        </div>
        {canEdit && (
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add CLO
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search CLOs by course or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add CLO Form */}
      {showAddForm && canEdit && (
        <Card>
          <CardHeader>
            <CardTitle>Add New CLO</CardTitle>
            <CardDescription>Define a new Course Learning Outcome</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course">Course</Label>
                <Input id="course" placeholder="Enter course name" />
              </div>
              <div>
                <Label htmlFor="weight">Weight (%)</Label>
                <Input id="weight" type="number" placeholder="25" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">CLO Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what students should be able to do..."
                className="min-h-20"
              />
            </div>
            <div>
              <Label htmlFor="plo">Related PLO</Label>
              <Input id="plo" placeholder="PLO1" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCLO}>Add CLO</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CLO Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Course Learning Outcomes
          </CardTitle>
          <CardDescription>
            Overview of all CLOs with mapping statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CLO ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>PLO</TableHead>
                <TableHead>TPQI Units</TableHead>
                <TableHead>Avg Confidence</TableHead>
                {canEdit && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCLOs.map((clo) => (
                <TableRow key={clo.id}>
                  <TableCell className="font-medium">{clo.id}</TableCell>
                  <TableCell>{clo.course}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={clo.description}>
                      {clo.description}
                    </div>
                  </TableCell>
                  <TableCell>{clo.weight}%</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{clo.plo}</Badge>
                  </TableCell>
                  <TableCell>{clo.mappedUnits} units</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${clo.avgConfidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{clo.avgConfidence}%</span>
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CLOManagement;
