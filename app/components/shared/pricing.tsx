import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";
import { SubmitButton } from "../dashboard/SubmitButtons";

interface iAppProps {
    id: number;
    cardTitle: string;
    cardDescription: string;
    priceTitle: string;
    benefits: string[];
}

export const PricingPlans: iAppProps[] = [
    {
        id: 0,
        cardTitle: "FreeLance",
        cardDescription: "FreeLance is best plan for people starting out.",
        priceTitle: "Free",
        benefits: [
            "1 site",
            "10 Articles",
            "1000 Visitors",
            "ads",
        ],
    },
    {
        id: 1,
        cardTitle: "Startup",
        cardDescription: "Start up is best pricing for Professionals.",
        priceTitle: "$9",
        benefits: [
            "10 site",
            "100 Articles",
            "Unlimited Visitors",
            "no ads",
        ],
    }
];

export function PricingTable() {
    return (
        <>
            <div className="max-w-2xl mx-auto text-center">
                <p className="font-semibold text-primary text-xl">
                    Pricing
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Pricing Plans for everyone and every budget!
                </h3>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center leading-tight text-muted-foreground">
                Choose from a range of flexible plans designed to fit any budget. 
                Whether you need a basic or premium option, 
                we ensure top quality and reliable support. 
                Pick your plan today and enjoy our great features!
            </p>
            <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2">
                {PricingPlans.map((plan) => (
                    <Card key={plan.id} className={plan.id === 1 ? "border-primary" : ""}>
                        <CardHeader>
                            <CardTitle>
                                {plan.id === 1 ? (
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-primary">Startup</h3> 
                                            <p className="rounded-full bg-primary/20 px-3 py-1
                                                          text-xs font-semibold leading-5 text-primary">Most popular</p>
                                        </div>
                                    ) : (
                                        <>{plan.cardTitle}</>
                                    )}
                            </CardTitle>
                            <CardDescription>
                                {plan.cardDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-6 text-4xl font-bold tracking-tight">
                                {plan.priceTitle}
                            </p>
                            <ul className="mt-8 space-y-3 text-sm leading-5 text-muted-foreground">
                                {plan.benefits.map((benefit, index) => (
                                    <li key={index} className="flex gap-x-3">
                                        <Check className="text-primary size-5" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {plan.id === 1 ? (
                                <form action={CreateSubscription} className="w-full">
                                    <SubmitButton text="Buy Now" className="w-full mt-5" />
                                </form>
                            ) : (
                                <Button variant="outline" className="w-full mt-5" asChild>
                                    <Link href="/dashboard">
                                        Try for free
                                    </Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}