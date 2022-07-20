import Page from "../components/Page";
import Nav from "../components/Nav";
import {
  Stat,
  StatLabel,
  StatHelpText,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("../components/LineChart"), {
  ssr: false,
});
const SparkLineChart = dynamic(() => import("../components/SparkLineChart"), {
  ssr: false,
});
const Bar = dynamic(() => import("../components/Bar"), {
  ssr: false,
});
const DonutChart = dynamic(() => import("../components/DonutChart"), {
  ssr: false,
});

export default function Dao(props) {
  return (
    <>
      <Nav page={props.dao} />
      <Page>
        <Grid
          mt={10}
          h="200px"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            p={0}
            rowStart={1}
            colStart={1}
            rowSpan={1}
            colSpan={{ sm: 5, md: 5, lg: 2 }}
            h={"220px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stat p={6} pb={0}>
              <StatLabel>Number of votes</StatLabel>
              <StatHelpText>The number of votes cast each day</StatHelpText>
            </Stat>
            <Box>
              <SparkLineChart  />
            </Box>
          </GridItem>
          <GridItem
            p={0}
            rowStart={2}
            colSpan={{ sm: 5, md: 5, lg: 2 }}
            h={"220px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stat p={6} pb={0}>
              <StatLabel>Number of proposals</StatLabel>
              <StatHelpText>
                The number of proposals created each day
              </StatHelpText>
            </Stat>
            <Box>
              <SparkLineChart  />
            </Box>
          </GridItem>
          <GridItem
            colSpan={{ sm: 5, lg: 3 }}
            colStart={{ sm: 1, lg: 3 }}
            rowSpan={2}
            h={{ sm: "500px", lg: "auto" }}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            {" "}
            <Stat>
              <StatLabel>Holdings (in USD)</StatLabel>
              <StatHelpText>
                The value of the governance tokens held in the DAO reserve
              </StatHelpText>
            </Stat>
            <Box>
              <LineChart  />
            </Box>
          </GridItem>
          <GridItem
            p={6}
            colSpan={5}
            h={"440px"}
            borderWidth="1px"
            borderRadius="lg"
          >
            {" "}
            <Stat>
              <StatLabel>Voting power</StatLabel>
              <StatHelpText>
                The number of the votes delegated to and held by addresses
              </StatHelpText>
            </Stat>
            <Bar />
          </GridItem>
          {props.concentration && (
            <>
              <GridItem
                colSpan={{ sm: 5, lg: 2 }}
                h={"540px"}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
              >
                {" "}
                <Stat>
                  <StatLabel>Top token holders</StatLabel>
                  <StatHelpText>
                    The number of governance tokens held by the top 10 addresses
                  </StatHelpText>
                </Stat>
                <Box>
                  <Bar
                    
                  />
                </Box>
              </GridItem>
              <GridItem
                colSpan={{ sm: 5, lg: 3 }}
                h={"540px"}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
              >
                {" "}
                <Stat>
                  <StatLabel>Token distribution</StatLabel>
                  <StatHelpText>
                    The distribution of governance tokens across all holders
                  </StatHelpText>
                </Stat>
                <Box>
                  <DonutChart
                   
                  />
                </Box>
              </GridItem>
            </>
          )}
        </Grid>
      </Page>
    </>
  );
}


