"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ContactMessageSchema  } from "@/app/utils/zodSchemas"; 
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { useFormState } from "react-dom";
import { CreateContactMessageAction } from "../actions";
import { Hero } from "../components/frontend/Hero";
import { Footer } from "../components/frontend/Footer";

export default function ContactUsRoute() {
  const [lastResult, action] = useFormState(CreateContactMessageAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: ContactMessageSchema , 
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="text-sm font-semibold leading-7 text-primary uppercase tracking-wide">
            We&apos;re here to help
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Have questions or feedback? We&apos;d love to hear from you! Please fill out the form below.
          </p>
        </div>
        <br /> <br />
        <Card className="max-w-[450px]">
          <CardHeader>
          <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              We&apos;d love to hear from you! Please fill out the form below.
            </CardDescription>
          </CardHeader>
          <form id={form.id}onSubmit={form.onSubmit} action={action}>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input
                    name={fields.name.name}
                    key={fields.name.key}
                    defaultValue={fields.name.initialValue}
                    placeholder="Your Name"
                  />
                  <p className="text-red-500 text-sm">{fields.name.errors}</p>
                </div>

                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name={fields.email.name}
                    key={fields.email.key}
                    defaultValue={fields.email.initialValue}
                    placeholder="Your Email"
                  />
                  <p className="text-red-500 text-sm">{fields.email.errors}</p>
                </div>

                <div className="grid gap-2">
                  <Label>Message</Label>
                  <Textarea
                    name={fields.message.name}
                    key={fields.message.key}
                    defaultValue={fields.message.initialValue}
                    placeholder="Your Message"
                  />
                  <p className="text-red-500 text-sm">{fields.message.errors}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton text="Send Message" />
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
