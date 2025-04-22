"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
	ArrowUpDown,
	ChevronDown,
	ChevronsUpDown,
	Clock,
	Clipboard,
	SlidersHorizontal,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import { mockApplications } from "@/app/utils/mock/patent-data";
import type { PatentApplication } from "@/app/utils/mock/patent-data";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";

const DraggableApplicationRow: React.FC<{
	application: PatentApplication;
	moveToWorkSpace: (id: string) => void;
	index: number;
	getPriorityColor: (priority: string) => string;
}> = ({ application, moveToWorkSpace, index, getPriorityColor }) => {
	return (
		<Draggable draggableId={application.id} index={index}>
			{(provided, snapshot) => (
				<TableRow
					key={application.id}
					className={cn("group", snapshot.isDragging ? "opacity-50" : "")}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<TableCell className="font-medium">{application.id}</TableCell>
					<TableCell>{application.title}</TableCell>
					<TableCell>{application.filingDate}</TableCell>
					<TableCell>{application.technologyArea}</TableCell>
					<TableCell>
						<Badge
							className={cn(
								"font-normal",
								getPriorityColor(application.priorityLevel),
							)}
						>
							{application.priorityLevel}
						</Badge>
					</TableCell>
					<TableCell className="text-right">
						<Button
							size="sm"
							onClick={() => moveToWorkSpace(application.id)}
							disabled={application.stage === "Verification"}
						>
							<Clipboard className="h-4 w-4 mr-2" />
              {application.stage === "Verification" ? 'In Workspace' : 'Move to Workspace'}
						</Button>
					</TableCell>
				</TableRow>
			)}
		</Draggable>
	);
};
export default function ApplicationQueue() {
	const [applications, setApplications] = useState<PatentApplication[]>(
		mockApplications
			.filter((app) => ["New", "Verification", "Search"].includes(app.stage))
			.slice(0, 10),
	);

	const [sortByColumn, setSortByColumn] =
		useState<keyof PatentApplication>("filingDate");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (column: keyof PatentApplication) => {
		if (sortByColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortByColumn(column);
			setSortDirection("asc");
		}
	};

	const sortedApplications = [...applications].sort((a, b) => {
		if (sortDirection === "asc") {
			return (a[sortByColumn] ?? 0) > (b[sortByColumn] ?? 0) ? 1 : -1;
		}
		return (a[sortByColumn] ?? 0) < (b[sortByColumn] ?? 0) ? 1 : -1;
	});

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "Low":
				return "bg-patent-lightgray text-patent-gray";
			case "Medium":
				return "bg-patent-blue/20 text-patent-blue";
			case "High":
				return "bg-patent-yellow/20 text-patent-yellow";
			case "Urgent":
				return "bg-patent-red/20 text-patent-red";
			default:
				return "bg-patent-lightgray text-patent-gray";
		}
	};

	const moveToWorkspace = (id: string) => {
		setApplications(
			applications.map((app) =>
				app.id === id
					? { ...app, stage: "Verification", assignedExaminer: "Examiner 1" }
					: app,
			),
		);
	};

	return (
		<Card className="col-span-3 bg-white shadow-sm dark:bg-slate-800">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Application Queue</CardTitle>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="sm">
						<SlidersHorizontal className="h-4 w-4 mr-2" />
						Filters
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<Clock className="h-4 w-4 mr-2" />
								Priority
								<ChevronDown className="h-4 w-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>All</DropdownMenuItem>
							<DropdownMenuItem>Urgent</DropdownMenuItem>
							<DropdownMenuItem>High</DropdownMenuItem>
							<DropdownMenuItem>Medium</DropdownMenuItem>
							<DropdownMenuItem>Low</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent>
				<div className="bg-patent-blue/10 p-3 mb-4 rounded-md text-patent-blue">
					<p className="text-sm">
						<strong>Tip: </strong>Send applications to the verificatoin
						workplace to begin processing..{" "}
					</p>
				</div>
				<Droppable droppableId="applicationQueue" type="APPLICATION">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<div className="flex items-center">
												ID
												<ChevronsUpDown className="ml-2 h-4 w-4" />
											</div>
										</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>
											<div className="flex items-center">
												Filing Date
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</div>
										</TableHead>
										<TableHead>
											<div className="flex items-center">
												Technology Area
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</div>
										</TableHead>
										<TableHead>
											<div className="flex items-center">
												Priority
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</div>
										</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{sortedApplications.map((application, index) => (
										<DraggableApplicationRow
											key={application.id}
											application={application}
											moveToWorkSpace={moveToWorkspace}
											getPriorityColor={getPriorityColor}
											index={index}
										/>
									))}
									{provided.placeholder}
								</TableBody>
							</Table>
						</div>
					)}
				</Droppable>
			</CardContent>
		</Card>
	);
}
