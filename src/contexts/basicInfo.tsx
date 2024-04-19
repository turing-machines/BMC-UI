import { createContext, useContext, useState } from "react";

interface BasicInfo {
  hostname: string;
  version: string;
  updateBasicInfo: (hostname: string, version: string) => void;
}

const BasicInfoContext = createContext<BasicInfo>({
  hostname: "",
  version: "",
  updateBasicInfo: () => {
    console.error("No BasicInfoProvider found");
  },
});

export const BasicInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [basicInfo, setBasicInfo] = useState({
    hostname: "turing",
    version: "1.0.0",
  });

  const updateBasicInfo = (hostname: string, version: string) => {
    setBasicInfo({ hostname, version });
  };

  return (
    <BasicInfoContext.Provider
      value={{
        ...basicInfo,
        updateBasicInfo,
      }}
    >
      {children}
    </BasicInfoContext.Provider>
  );
};

export function UseBasicInfo() {
  return useContext(BasicInfoContext);
}
