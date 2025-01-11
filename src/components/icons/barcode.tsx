import { cn } from "@/lib/utils";
import Image from "next/image";

const Barcode = ({ className }: { className: string }) => {
  return (
    <div className={cn("h-6 w-52 sm:h-12", className)}>
      <Image
        alt="barcode"
        src="/images/barcode.png"
        fill
        sizes="100vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Barcode;
