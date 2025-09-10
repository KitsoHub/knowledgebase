import { MedicinalPlant } from "@/lib/types/botanical";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../shared/image-with-fallback";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

interface PlantModalProps {
    plant: MedicinalPlant | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PlantModal: React.FC<PlantModalProps> = ({ plant, isOpen, onClose }) => {
    if (!isOpen || !plant) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col max-w-4xl max-h-[90vh] ">

              <DialogHeader className="pb-4 px-6 pt-6 flex-shrink-0">
                    <DialogTitle className="flex items-start gap-4">
                        <div className="flex-1">
                            <h2 className="text-2xl">{plant.name}</h2>
                            <p className="text-lg text-muted-foreground italic">{plant.scientificName}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">{plant.family}</Badge>
                                <Badge variant="outline">{plant.origin}</Badge>
                            </div>
                        </div>
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                                src={plant.image}
                                alt={plant.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[870px] min-h-0 px-6 pb-6">
                    <div className="space-y-4">
                        {/* Overview Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>{plant.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Parts Used</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {plant.partsUsed.map((part) => (
                                                    <Badge key={part} variant="outline">{part}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium mb-2">Medicinal Qualities</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {plant.medicinalQualities.map((quality) => (
                                                    <Badge key={quality} variant="default">{quality}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Traditional Uses</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                            {plant.traditionalUses.map((use, index) => (
                                                <li key={index}>{use}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                        </motion.div>

                        {/* Tabbed Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Tabs defaultValue="modern" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="modern">Modern Medicine</TabsTrigger>
                                    <TabsTrigger value="homeopathic">Homeopathic Uses</TabsTrigger>
                                    <TabsTrigger value="research">Research</TabsTrigger>
                                </TabsList>

                                <TabsContent value="modern" className="space-y-4">
                                    <Card>
                                        <CardContent className="pt-6 space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Active Compounds</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {plant.modernMedicine.activeCompounds.map((compound) => (
                                                        <Badge key={compound} variant="secondary">{compound}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">Clinical Studies</h4>
                                                <ul className="space-y-2">
                                                    {plant.modernMedicine.clinicalStudies.map((study, index) => (
                                                        <li key={index} className="text-sm p-2 bg-muted rounded-md">
                                                            {study}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">Approved Uses</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {plant.modernMedicine.approvedUses.map((use, index) => (
                                                        <li key={index}>{use}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2 text-destructive">Contraindications</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-destructive">
                                                    {plant.modernMedicine.contraindications.map((contraindication, index) => (
                                                        <li key={index}>{contraindication}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="homeopathic" className="space-y-4">
                                    <Card>
                                        <CardContent className="pt-6 space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Preparations</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {plant.homeopathicUses.preparations.map((prep) => (
                                                        <Badge key={prep} variant="outline">{prep}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">Conditions Treated</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {plant.homeopathicUses.conditions.map((condition, index) => (
                                                        <li key={index}>{condition}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">Dosage</h4>
                                                <p className="text-sm p-3 bg-muted rounded-md">
                                                    {plant.homeopathicUses.dosage}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="research" className="space-y-4">
                                    <Card>
                                        <CardContent className="pt-6 space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-3">Recent Studies</h4>
                                                <div className="space-y-3">
                                                    {plant.research.recentStudies.map((study, index) => (
                                                        <div key={index} className="border rounded-lg p-4 space-y-2">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <h5 className="font-medium text-sm">{study.title}</h5>
                                                                <Badge variant="outline" className="text-xs">{study.year}</Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{study.findings}</p>
                                                            <p className="text-xs text-muted-foreground italic">{study.source}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">Future Research Directions</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {plant.research.futureDirections.map((direction, index) => (
                                                        <li key={index}>{direction}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="font-medium mb-2">References</h4>
                                                <ul className="space-y-1 text-xs text-muted-foreground">
                                                    {plant.references.map((reference, index) => (
                                                        <li key={index} className="p-2 bg-muted rounded">
                                                            {reference}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>
                </ScrollArea>

            </DialogContent>
        </Dialog>
    );
}
