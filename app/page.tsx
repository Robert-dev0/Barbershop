import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";
import BarbershopsCarousel from "./_components/barbershops-carousel";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    where: {
      name: {
        in: ["Aparência Impecável", "Barba & Navalha"],
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="max-w-3xl mx-auto bg-background min-h-screen shadow-xl overflow-hidden border-x border-border">
      <Header />
      <PageContainer>
        <div className="mx-auto w-full max-w-sm mt-3 lg:mt-6">
          <SearchInput />
        </div>

        <div className="w-full">
          <QuickSearchButtons />
        </div>

        <div className="mt-6 w-full">
          <Image
            src={banner}
            alt="Agende agora!"
            className="h-auto w-full rounded-xl object-cover lg:rounded-2xl"
          />
        </div>

        <div className="mt-8">
          <PageSection>
            <PageSectionTitle>Recomendados</PageSectionTitle>
            <BarbershopsCarousel barbershops={recommendedBarbershops} />
          </PageSection>

        </div>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
