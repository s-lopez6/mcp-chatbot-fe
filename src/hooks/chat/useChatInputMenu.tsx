import React, { useMemo, useState, type JSX } from "react";

import {
  Search,
  Add, // Para "add"
  WbSunny, // Para "openweather"
  Image, // Para "unsplash_random"
  ImageSearch, // Para "unsplash_search"
  Article, // Para "news"
  Gif, // Para "giphy"
  Movie, // Para "moviedb"
  Rocket, // Para "nasa"
} from "@mui/icons-material";
import { useListPrompts } from "./useListPrompts";
import { useListTools } from "./useListTools";
import { useListResources } from "./useListResources";

export interface ChatInputMenuItem {
  name: string;
  icon?: JSX.Element;
  description: string;
}

export interface ChatInputMenu {
  tools: ChatInputMenuItem[];
  resources: ChatInputMenuItem[];
  prompts: ChatInputMenuItem[];
}

const iconMapping: Record<string, JSX.Element> = {
  add: <Add />,
  openweather: <WbSunny />,
  unsplash_random: <Image />,
  unsplash_search: <ImageSearch />,
  news: <Article />,
  giphy: <Gif />,
  moviedb: <Movie />,
  nasa: <Rocket />,
};

export const useChatInputMenu = () => {
  const prompts = useListPrompts();
  const tools = useListTools();
  const resources = useListResources();

  const menu = useMemo(() => {
    console.log("generando menu ...");
    let toolsMenu: ChatInputMenuItem[] = [];
    let promptsMenu: ChatInputMenuItem[] = [];
    let resourcesMenu: ChatInputMenuItem[] = [];

    if (!tools.isLoading) {
      toolsMenu =
        tools.data?.tools.map(
          (tool) =>
            ({
              name: tool.title,
              description: tool.description,
              icon: iconMapping[tool.name],
            } as ChatInputMenuItem)
        ) || [];
    }

    if (!resources.isLoading) {
      resourcesMenu =
        resources.data?.resources.map(
          (resource) =>
            ({
              name: resource.title,
              description: resource.description,
              // icon: <Search />,
            } as ChatInputMenuItem)
        ) || [];
    }

    if (!prompts.isLoading) {
      promptsMenu =
        prompts.data?.prompts.map(
          (prompt) =>
            ({
              name: prompt.title,
              description: prompt.description,
              // icon: <Search />,
            } as ChatInputMenuItem)
        ) || [];
    }

    return {
      tools: toolsMenu,
      resources: resourcesMenu,
      prompts: promptsMenu,
    } as ChatInputMenu;
  }, [
    tools.data?.tools,
    tools.isLoading,
    resources.data?.resources,
    resources.isLoading,
    prompts.data?.prompts,
    prompts.isLoading,
  ]);

  return {
    menu,
  };
};
