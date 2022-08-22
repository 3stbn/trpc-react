import { Page } from "../components/Page";
import { Navbar } from "../components/Navbar";

import { tutorialStatusEnum, tutorialStatus } from "local-shared";
import { pascalCaseToSentence } from "../utils/formating";
import { useAppContext } from "../context/AppContext";
import { VideoModal } from "../components/VideoModal";
import { TutorialTab } from "../components/TutorialTab";

export const videoStatusOptions = tutorialStatusEnum.map((status) => ({
  value: status,
  label: pascalCaseToSentence(status),
}));

export function Dashboard() {
  const { showModal, selectedTab, setSelectedTab } = useAppContext();

  function activeTabClass(tab: tutorialStatus) {
    return isTabActive(tab) ? "is-active" : "";
  }

  function isTabActive(tab: tutorialStatus) {
    return tab === selectedTab;
  }

  return (
    <>
      <Navbar />
      <Page>
        <div className="tabs is-centered">
          <ul>
            {videoStatusOptions.map((tab) => (
              <li
                key={tab.value}
                className={`tab ${activeTabClass(tab.value)}`}
              >
                <a
                  href={`#/?tab=${tab.value}`}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {videoStatusOptions.map(
          (tab) =>
            isTabActive(tab.value) && (
              <TutorialTab key={tab.value} tab={tab.value} />
            )
        )}
      </Page>
      {showModal && <VideoModal />}
    </>
  );
}
