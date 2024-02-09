import { Skeleton } from "@mantine/core";
import React from "react";

export const SkeletonTabular = ({ howMany = 1, ...rest }) => {
  return (
    <>
      {[...Array(howMany)].map((item, index) => (
        <Skeleton  {...rest} />
      ))}
    </>
  );
};
