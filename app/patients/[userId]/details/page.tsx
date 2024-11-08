import DataPatient from "@/components/DataPatient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getPatient,
  getPatientDetails,
  getUser,
} from "@/lib/actions/patient.actions";
import { Upload } from "lucide-react";
import Link from "next/link";

const Details = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getUser(userId);
  // console.log(patient);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card className="sm:col-span-2 mt-4">
            <CardHeader className="pb-3">
              <CardTitle>Bonjour, {patient?.name} </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Votre espace personnel : Suivez vos rendez-vous, vos
                prescriptions et votre parcours de santé en toute simplicité.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/patients/${userId}/new-appointment`}>
                <Button className="shad-primary-btn">
                  Nouveau rendez-vous
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <div className="my-4">
            <DataPatient
              patientId={patient.$id}
              userId={userId}
              email={patient.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
