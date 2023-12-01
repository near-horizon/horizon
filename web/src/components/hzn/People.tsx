// import { cn } from "@lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

function List({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-auto flex flex-row items-stretch justify-start gap-8">
        {children}
      </div>
    </div>
  );
}

interface CardProps {
  image: string;
  name: string;
  title: string;
  project: string;
}

function Card({ image, name, title, project }: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background-light rounded-2xl h-80 min-w-[15rem]">
      <img src={image} alt={name} className="w-36 h-36 rounded-full" />
      <div className="text-center gap-3 w-full flex flex-col items-center justify-start">
        <h3 className="text-xl font-bold text-ui-elements-dark">{name}</h3>
        <h4 className="text-ui-elements-dark">{title}</h4>
        <p className="text-ui-elements-gray">{project}</p>
      </div>
    </div>
  );
}

export function People({
  people: data,
}: {
  people: (CardProps & { role: string; featured: boolean })[];
}) {
  return (
    <Tabs defaultValue="alumni">
      <div className="flex justify-center mb-10">
        <TabsList className="text-ui-elements-dark bg-transparent gap-4 text-4xl font-bold flex-col md:flex-row">
          <TabsTrigger
            value="alumni"
            className="text-4xl font-bold bg-transparent data-[state=active]:shadow-none data-[state=inactive]:text-ui-elements-gray transition-colors duration-200"
          >
            HZN alumni
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="text-4xl font-bold bg-transparent data-[state=active]:shadow-none data-[state=inactive]:text-ui-elements-gray transition-colors duration-200"
          >
            Our team
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="alumni">
        {data && (
          <List>
            {data
              .filter(({ role, featured }) => role === "HZN member" && featured)
              .map((props, i) => (
                <Card key={i} {...props} />
              ))}
          </List>
        )}
      </TabsContent>
      <TabsContent value="team">
        {data && (
          <List>
            {data
              .filter(({ role }) => role === "Team")
              .map((props, i) => (
                <Card key={i} {...props} />
              ))}
          </List>
        )}
      </TabsContent>
      {/* <div className="flex items-center justify-center w-full mt-10"> */}
      {/*   <a */}
      {/*     href="#" */}
      {/*     target="_blank" */}
      {/*     className={cn([ */}
      {/*       "flex items-center justify-center gap-2 rounded-full bg-ui-elements-dark text-ui-elements-white text-center text-sm font-semibold py-2 px-4 transition-colors duration-200", */}
      {/*       "hover:bg-ui-elements-gray hover:text-ui-elements-light hover:no-underline", */}
      {/*       "focus:bg-ui-elements-gray focus:text-ui-elements-light focus:no-underline", */}
      {/*       "active:bg-ui-elements-gray active:text-ui-elements-light active:no-underline", */}
      {/*     ])} */}
      {/*   > */}
      {/*     See all alumni */}
      {/*   </a> */}
      {/* </div> */}
    </Tabs>
  );
}
