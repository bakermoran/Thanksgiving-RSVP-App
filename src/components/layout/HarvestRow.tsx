import { Illustration } from "@/ui/illustration";

export const HarvestRow = () => (
  <div aria-hidden className="mt-8 flex items-end justify-center gap-6">
    <Illustration name="pumpkin" className="w-16" />
    <Illustration name="acorn" animate="bob" className="w-9" />
    <Illustration name="pie" className="w-20" />
    <Illustration
      name="acorn"
      animate="bob"
      className="w-9 [animation-delay:-1.2s]"
    />
    <Illustration name="pumpkin" className="w-16 -scale-x-100" />
  </div>
);
