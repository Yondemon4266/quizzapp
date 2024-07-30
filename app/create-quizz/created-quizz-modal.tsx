"use client";
import React from "react";

type CreatedQuizzModalProps = {
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
};

export default function CreatedQuizzModal({
  isSubmitting,
  isSubmitSuccessful,
}: CreatedQuizzModalProps) {
  console.log(isSubmitSuccessful);

  if (!isSubmitting) {
    return null;
  } else {
    return <div>hello</div>;
  }
}
