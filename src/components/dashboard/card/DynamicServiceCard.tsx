
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
export type Service = {
  name: string;
  category: string;
  times: number;
  revenue: number;
  image: string;
};

type DynamicServiceCardProps = {
  services: Service[];
};



const DynamicServiceCard = ({ services }: DynamicServiceCardProps) => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Top Selling Services</CardTitle>
        <div className="space-x-2">
          <select className="border rounded p-1">
            <option>All Category</option>
          </select>
          <input
            type="month"
            defaultValue="2024-08"
            className="border rounded p-1"
          />
          <button className="border rounded p-1">See More</button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Times</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Image
                    src={service.image}
                    width={24}
                    height={24}
                    alt={service.name}
                    className="w-6 h-6 mr-2 inline-block"
                  />
                  {service.name}
                </TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.times}</TableCell>
                <TableCell>${service.revenue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default DynamicServiceCard;