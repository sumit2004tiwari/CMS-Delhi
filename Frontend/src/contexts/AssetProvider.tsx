"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AssetContextType {
  jigjawLoaded: boolean;
  springLoaded: boolean;
  cloudLoaded: boolean;
  vrLoaded: boolean;
  allAssetsLoaded: boolean;
  setJigjawLoaded: (loaded: boolean) => void;
  setSpringLoaded: (loaded: boolean) => void;
  setCloudLoaded: (loaded: boolean) => void;
  setVrLoaded: (loaded: boolean) => void;
}

const AssetContext = createContext<AssetContextType>({
  jigjawLoaded: false,
  springLoaded: false,
  cloudLoaded: false,
  vrLoaded: false,
  allAssetsLoaded: false,
  setJigjawLoaded: () => {},
  setSpringLoaded: () => {},
  setCloudLoaded: () => {},
  setVrLoaded: () => {},
});

interface AssetProviderProps {
  children: ReactNode;
}

export const AssetProvider = ({ children }: AssetProviderProps) => {
  const [jigjawLoaded, setJigjawLoaded] = useState(false);
  const [springLoaded, setSpringLoaded] = useState(false);
  const [cloudLoaded, setCloudLoaded] = useState(false);
  const [vrLoaded, setVrLoaded] = useState(true); // Set to true for now since VR modal not found
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  
  useEffect(() => {
    // Check if all modals are loaded
    const allLoaded = jigjawLoaded && springLoaded && cloudLoaded && vrLoaded;
    setAllAssetsLoaded(allLoaded);
  }, [jigjawLoaded, springLoaded, cloudLoaded, vrLoaded]);
  
  return (
    <AssetContext.Provider value={{
      jigjawLoaded,
      springLoaded,
      cloudLoaded,
      vrLoaded,
      allAssetsLoaded,
      setJigjawLoaded,
      setSpringLoaded,
      setCloudLoaded,
      setVrLoaded,
    }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
