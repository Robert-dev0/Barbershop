import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionGrid,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";

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
    <main className="mx-auto max-w-5xl">
      <Header />
      <PageContainer>
        <div className="mx-auto w-full max-w-2xl lg:mt-6">
          <SearchInput />
        </div>

        <QuickSearchButtons />

        <div className="relative mt-6 h-[700px] w-full md:h-[700px] lg:h-[800px]">
          <Image
            src={banner}
            alt="Agende agora!"
            fill
            className="rounded-xl object-cover lg:rounded-2xl"
          />
        </div>

        <div className="lg:mt-10 lg:space-y-10">
          <PageSection>
            <PageSectionTitle>Recomendados</PageSectionTitle>
            <PageSectionGrid>
              {recommendedBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionGrid>
          </PageSection>

        </div>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
