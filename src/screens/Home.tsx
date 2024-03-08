import { Box } from "@components/Box";
import { Header } from "@components/Header";
import { TipsHome } from "@components/TipsHome";

export function Home () {
  return (
    <Box backgroundColor="mainBackground" flex={1} paddingTop="l">
      <Header style="home" />
      <TipsHome />
    </Box>
  )
}