export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export const PageSectionTitle = ({ children }: { children: string }) => {
  return (
    <h2 className="text-foreground text-xs font-semibold uppercase lg:text-xl lg:font-bold">
      {children}
    </h2>
  );
};

export const PageSection = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

export const PageSectionGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {children}
    </div>
  );
};
