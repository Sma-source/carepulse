"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
  SquarePen,
  Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getPatientDetails, getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";

const DataPatient = ({
  patientId,
  userId,
  email,
}: {
  patientId: string;
  userId: string;
  email: string;
}) => {
  const [patientDetails, setPatientDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Check if the fetched user ID matches the provided userId
        if (patientId !== userId) {
          throw new Error("User ID mismatch. Data may be inconsistent.");
        }

        // Fetch patient details using the user's email
        const details = await getPatientDetails(email);
        // console.log(details);

        setPatientDetails(details);
      } catch (err: any) {
        console.error("An error occurred while fetching patient details:", err);
        setError(
          err.message || "An error occurred while fetching patient details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [userId]);

  if (!patientDetails) {
    return <div>No patient details available.</div>;
  }
  return (
    <>
      {patientDetails.map((detail: any) => (
        <div key={detail.$id}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Mes Informations
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <SquarePen className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Modifier mes infos
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Informations Personnelles</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nom complet</span>
                    <span>{detail.name} </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Date de naissance
                    </span>
                    <span>{formatDateTime(detail.birthDate).dateOnly}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sexe</span>
                    <span>{detail.genre}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Adresse Postale
                    </span>
                    <span>{detail.address}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Numéro de téléphone
                    </span>
                    <span>{detail.phone}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Adresse email</span>
                    <span>{detail.email}</span>
                  </li>
                </ul>
                <Separator className="my-2 bg-gray-400" />
                <div className="font-semibold">Informations Médicales</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Antécédents médicaux
                    </span>
                    <span>{detail.pastMedicalHistory}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Allergies</span>
                    <span>{detail.allergies}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Traitements en cours
                    </span>
                    <span>{detail.currentMedication}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Médecin traitant
                    </span>
                    <span>{detail.primaryPhysician}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4 bg-gray-400" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4 bg-gray-400" />
              <div className="grid gap-3">
                <div className="font-semibold">Assurance</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      Nom de la compagnie d'assurance
                    </dt>
                    <dd>{detail.insuranceProvider}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      Numéro de police d'assurance
                    </dt>
                    <dd>
                      <dd>{detail.insurancePolicyNumber}</dd>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};

export default DataPatient;
