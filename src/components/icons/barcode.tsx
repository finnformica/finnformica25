import { cn } from "@/lib/utils";
import Image from "next/image";

const Barcode = ({ className }: { className: string }) => {
  return (
    <div className={cn("h-12 w-52", className)}>
      <Image
        alt="barcode"
        src="/barcode.png"
        fill
        sizes="100vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Barcode;
