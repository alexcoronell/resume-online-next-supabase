import React from "react";
import ButtonPrimary from "@/components/shared/buttons/button-primary";
import ButtonSecondary from "@/components/shared/buttons/button-secondary";
import ButtonLight from "@/components/shared/buttons/button-light";

export function HeaderButtons() {
  return (
    <div className="flex items-center gap-2">
      <ButtonPrimary title="Create" type="link" url="" />
      <ButtonSecondary title="Refresh" type="button" />
      <ButtonLight title="Back" type="link" url="/admin" />
    </div>
  );
}
