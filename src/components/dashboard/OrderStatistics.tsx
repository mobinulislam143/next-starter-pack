import { MoreHorizontal, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { brokers, stats } from "@/types/dahboardFakeData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrderStatistics() {
  return (
    <div className="w-full mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="border border-gray-200 rounded-2xl bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-start">
                    <IconComponent className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Broker List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Top Broker List</h2>

        <Table className="text-black">
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-[200px] py-4 px-6 text-left font-medium text-gray-700">Profile</TableHead>
              <TableHead className="hidden sm:table-cell py-4 px-6 text-left font-medium text-gray-700">
                Email
              </TableHead>
              <TableHead className="hidden sm:table-cell py-4 px-6 text-left font-medium text-gray-700">
                Address
              </TableHead>
              <TableHead className="text-right py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokers.map((broker) => (
              <TableRow
                key={broker.id}
                className={`bg-[#edf5f2]`}
              >
                {/* Profile Cell */}
                <TableCell className="font-medium py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900 text-sm">{broker.name}</p>
                      <p className="text-sm text-gray-500 sm:hidden mt-1">{broker.email}</p>
                    </div>
                  </div>
                  {/* Address on mobile */}
                  <p className="text-sm text-gray-500 sm:hidden mt-2">{broker.address}</p>
                </TableCell>

                {/* Email Cell */}
                <TableCell className="hidden sm:table-cell py-4 px-6 text-gray-600 text-sm">{broker.email}</TableCell>

                {/* Address Cell */}
                <TableCell className="hidden sm:table-cell py-4 px-6 text-gray-900 text-sm">{broker.address}</TableCell>

                {/* Actions Cell */}
                <TableCell className="text-right py-4 px-6">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
