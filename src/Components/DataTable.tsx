import { Table } from "@mantine/core";

interface TableProps {
  data: any[];
  columns: { key: string; label: string }[];
}

export const CustomTable = ({ data, columns }: TableProps) => {
  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      {columns.map((column) => (
        <Table.Td key={column.key}>{row[column.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table stickyHeader highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th key={column.key}>{column.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
