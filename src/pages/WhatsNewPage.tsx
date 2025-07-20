import { Tabs, Tab } from "@heroui/react";
import { Rocket, BookOpen } from "lucide-react";
import AnnouncementPage from "./AnnouncementPage";
import DocumentationPage from "./DocumentationPage";

const WhatsNewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Tabs
        color="secondary"
        defaultSelectedKey="announcements"
        className="w-full text-white"
        classNames={{
          base: "w-full",
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider bg-background",
          cursor: "w-full !text-white",
          tab: "max-w-fit px-6 h-12 text-medium text-white",
        }}
      >
        <Tab
          key="announcements"
          title={
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span>What's New</span>
            </div>
          }
        >
          <AnnouncementPage />
        </Tab>
        <Tab
          key="documentation"
          title={
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </div>
          }
        >
          <DocumentationPage />
        </Tab>
      </Tabs>
    </div>
  );
};

export default WhatsNewPage;
