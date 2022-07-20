import React, { useState, useEffect } from 'react'
import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiFileText,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell
} from "react-icons/fi"
import MyChart from '../components/MyChart'
import axios from "axios";
import { addressShortner } from "../utils/helper";
// import { useSelector } from "react-redux";


export default function Dashboard() {
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)
    const [neededAddress, setNeededAddress] = useState('');
    const [dex, setDex] = useState('');
    const [transactionsETH, setTransactionsETH] = useState('');
    // const [transactionsBSC, setTransactionsBSC] = useState('');

    const APIKEY = 'ckey_52a12371af924b40af3f68e681f'
    const baseURL = 'https://api.covalenthq.com/v1'
    const blockchainChainId = '1'
    // const blockchainChainId2 = '56'
    const demoAddress = 'demo.eth'
    const dexname = 'uniswap_v2'
    // const contractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88'

    const callGetWalletAddressDetails = async (chainId, address) => {
        axios.get(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`)
            .then(data => {
                setNeededAddress(newAddress)
                // console.log("address:", data.data.data)

            })
            .catch(err => console.log(err))

    }

    const callGetDEX = async (chainId, dexname) => {
        axios.get(`${baseURL}/${chainId}/xy=k/${dexname}/pools/?key=${APIKEY}`)
            .then(data => {
                setNeededAddress(data.data.data)
                setDex(data.data.data.items)
                // console.log("dex", data.data.data.items)

            })
            .catch(err => console.log(err))

    }


    //https://api.covalenthq.com/v1/1/address/0xa79E63e78Eec28741e711f89A672A4C40876Ebf3/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=20&page-number=1&key=ckey_52a12371af924b40af3f68e681f

    const callGetTransactionsETH = async (chainId, address) => {
        axios.get(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`)
            .then(data => {
                setTransactionsETH(data.data.data.items)
                console.log("ETH", data.data.data.items)
            })
            .catch(err => console.log(err))

    }

    //https://api.covalenthq.com/v1/1/address/0x197e3eCCD00F07B18205753C638c3E59013A92bf/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&page-size=10&page-number=1&key=ckey_52a12371af924b40af3f68e681f
    const callGetTransactionsBSC = async (chainId, address) => {
        // axios.get(`${baseURL}/${chainId}/address/${address}/transfers_v2/contract-address=${contractAddress}/?key=${APIKEY}`)
        axios.get("https://api.covalenthq.com/v1/1/address/0x197e3eCCD00F07B18205753C638c3E59013A92bf/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&page-size=10&page-number=1&key=ckey_52a12371af924b40af3f68e681f")
            .then(data => {
                setTransactionsBSC(data.data.data)
                console.log("works:", data.data.data)

            })
            .catch(err => console.log(err))

    }



    useEffect(() => {
        callGetTransactionsETH(blockchainChainId,demoAddress)
        callGetTransactionsBSC(blockchainChainId, newAddress)
        callGetWalletAddressDetails(blockchainChainId, newAddress)
        callGetDEX(blockchainChainId, dexname)
    }, []);

    return (
        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
        >
            {/* Column 1 */}
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                backgroundColor="#020202"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf="center"
                            letterSpacing="tight"
                        >
                            DAOlytics.
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Home</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiPieChart} fontSize="2xl" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Dashboard</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiDollarSign} fontSize="2xl" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Token holders</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiFileText} fontSize="2xl" /></Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Docs</Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                        <Avatar my={2} src="avatar-1.png" />
                        <Text textAlign="center">{addressShortner(neededAddress.address)}</Text>
                    </Flex>
                </Flex>
            </Flex>

            {/* Column 2 */}
            <Flex
                w={["100%", "100%", "60%", "60%", "55%"]}
                p="3%"
                flexDir="column"
                overflow="auto"
                minH="100vh"
            >
                <Heading
                    fontWeight="normal"
                    mb={4}
                    letterSpacing="tight"
                >
                    Welcome back, <Flex display="inline-flex" fontWeight="bold">{addressShortner(neededAddress.address)}</Flex>
                </Heading>
                <Text color="gray" fontSize="sm">My Balance</Text>
                <Text fontWeight="bold" fontSize="2xl">$5,750.20</Text>
                <MyChart />
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Owners Balance</Heading>
                        <Text fontSize="small" color="gray" ml={4}>July 2022</Text>
                    </Flex>
                    <IconButton icon={<FiCalendar />} />
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Icon</Th>
                                    <Th>Name&Address</Th>
                                    <Th isNumeric>Balance</Th>
                                    <Th>Symbol</Th>
                                    <Th isNumeric>Token Type</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                    { <>
                                        
                                    </>
                                    }
                                    {display == 'show' &&
                                        <>
                                        {transactionsETH &&
                                                transactionsETH?.map((item) => {
                                            return (
                                                <Tr>
                                                <Td>
                                                <Avatar size="sm" mr={2} src={item.logo_url} />
                                                </Td>
                                                
                                                <Td>
                                                    <Flex align="center">
                                                        <Flex flexDir="column">
                                                            <Heading size="sm" letterSpacing="tight">{item.contract_name}</Heading>
                                                            <Text fontSize="sm" color="gray">{item.contract_address}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td isNumeric>{item.balance}</Td>
                                                <Td>{item.contract_ticker_symbol}</Td>
                                                <Td isNumeric><Text display="inline-table">{item.supports_erc}</Text></Td>
                                                </Tr>
                                            );
                                            })}
                                            {transactionsETH.length === 0 && (
                                        <Tr>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">No Data Available For Now</Text></Td>
                                        </Tr>
                                    )}
                                        </>
                                    }
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider />
                        <IconButton
                            icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => {
                                if (display == 'show') {
                                    changeDisplay('none')
                                } else {
                                    changeDisplay('show')
                                }
                            }}
                        />
                        <Divider />
                    </Flex>
                </Flex>
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">DEX Exchange Pools</Heading>
                        <Text fontSize="small" color="gray" ml={4}>July 2022</Text>
                    </Flex>
                    <IconButton icon={<FiCalendar />} />
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                             <Thead>
                                <Tr color="gray">
                                    <Th>Dex Name</Th>
                                    <Th >Token 1</Th>
                                    <Th >Token 2</Th>
                                    <Th >Gas Fee</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                    { <>
                                        
                                    </>
                                    }
                                    {display == 'show' &&
                                        <>
                                        {dex &&
                                                dex?.map((item) => {
                                            return (
                                                <>
                                                <Tr>
                                                <Td>{item.dex_name}</Td>
                                                <Td>
                                                    <Flex align="center">
                                                        <Avatar size="sm" mr={2} src={item.token_0.logo_url} />
                                                        <Flex flexDir="column">
                                                            <Heading size="sm" letterSpacing="tight">{item.token_0.contract_name}</Heading>
                                                            <Text fontSize="sm" color="gray">{item.token_0.contract_ticker_symbol}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td>
                                                    <Flex align="center">
                                                        <Avatar size="sm" mr={2} src={item.token_1.logo_url} />
                                                        <Flex flexDir="column">
                                                            <Heading size="sm" letterSpacing="tight">{item.token_1.contract_name}</Heading>
                                                            <Text fontSize="sm" color="gray">{item.token_1.contract_ticker_symbol}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td>{item.total_liquidity_quote}</Td>
                                                <Td>{item.total_liquidity_quote}</Td>
                                                </Tr>
                                    
                                                </>

                                            );
                                            })}
                                            {dex.length === 0 && (
                                        <Tr>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">No Data Available For Now</Text></Td>
                                        </Tr>
                                    )}
                                        </>
                                    }
                                        </Tbody>
                                    </Table>
                                </Flex>
                                <Flex align="center">
                                    <Divider />
                                    <IconButton
                                        icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />}
                                        onClick={() => {
                                            if (display == 'show') {
                                                changeDisplay('none')
                                            } else {
                                                changeDisplay('show')
                                            }
                                        }}
                                    />
                                    <Divider />
                                </Flex>
                </Flex>
            </Flex>

            {/* Column 3 */}
            <Flex
                w={["100%", "100%", "30%"]}
                bgColor="#F5F5F5" p="3%"
                flexDir="column"
                overflow="auto"
                minW={[null, null, "300px", "300px", "400px"]}
            >
                <Flex alignContent="center">
                    <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#fff" borderRadius="10px" mr={2}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FiSearch color="gray" />}
                        />
                        <Input type="number" placeholder="Search" borderRadius="10px" />
                    </InputGroup>
                    <IconButton icon={<FiBell />} fontSize="sm" bgColor="#fff" borderRadius="50%" p="10px" />
                    <Flex
                        w={30}
                        h={25}
                        bgColor="#B57295"
                        borderRadius="50%"
                        color="#fff"
                        align="center"
                        justify="center"
                        ml="-3"
                        mt="-2"
                        zIndex="100"
                        fontSize="xs"
                    >
                        2
                    </Flex>
                </Flex>
                <Heading letterSpacing="tight">My Cards</Heading>
                {value == 1 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, #B57295, #29259A)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">1000</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={FiCreditCard} />
                                    <Text>Rise.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 1289</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">12/23</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={FiCreditCard} />
                            </Flex>
                        </Flex>
                    </Box>
                }
                {value == 2 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, yellow.300, blue.500)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">$350.00</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={FiCreditCard} />
                                    <Text>Rise.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 8956</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">9/24</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={FiCreditCard} />
                            </Flex>
                        </Flex>
                    </Box>
                }
                {value == 3 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h="200px"
                        bgGradient="linear(to-t, orange.300, pink.600)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">$2,150.72</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={FiCreditCard} />
                                    <Text>Rise.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 8353</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">11/22</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={FiCreditCard} />
                            </Flex>
                        </Flex>
                    </Box>
                }
                <Flex justifyContent="center" mt={2}>
                    <Button bgColor={value == 1 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(1)} />
                    <Button bgColor={value == 2 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(2)} />
                    <Button bgColor={value == 3 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(3)} />
                </Flex>
                <Flex flexDir="column" my={4}>
                    <Flex justify="space-between" mb={2}>
                        <Text>Balance</Text>
                        <Text fontWeight="bold">$140.42</Text>
                    </Flex>
                    <Flex justify="space-between">
                        <Text>Credit Limit</Text>
                        <Text fontWeight="bold">$150.00</Text>
                    </Flex>
                </Flex>
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Supported DEXs</Heading>
                        {/* <Text fontSize="sm" color="gray" >View token listed on Uniswap Exchange</Text> */}
                                        
                        {/* <Text fontSize="small" color="gray" ml={4}>Apr 2021</Text> */}
                    </Flex>
                    {/* <IconButton icon={<FiCalendar />} /> */}
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                            <Tbody>
                                    { <>
                                        
                                    </>
                                    }
                                    {display == 'show' &&
                                        <>
                                        {dex &&
                                                dex?.map((item) => {
                                            return (
                                                <>
                                                <Tr>
                                                <Td>{item.chain_id}</Td>
                                                <Td>{item.chain_name}</Td>
                                                <Td>{item.dex_name}</Td>
                                                <Td>
                                                    <Flex align="center">
                                                        <Avatar size="sm" mr={2} src={item.token_0.logo_url} />
                                                        <Flex flexDir="column">
                                                            <Heading size="sm" letterSpacing="tight">{item.token_0.contract_name}</Heading>
                                                            <Text fontSize="sm" color="gray">{item.token_0.contract_ticker_symbol}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td>
                                                    <Flex align="center">
                                                        <Avatar size="sm" mr={2} src={item.token_1.logo_url} />
                                                        <Flex flexDir="column">
                                                            <Heading size="sm" letterSpacing="tight">{item.token_1.contract_name}</Heading>
                                                            <Text fontSize="sm" color="gray">{item.token_1.contract_ticker_symbol}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td>{item.swap_fee}</Td>
                                                </Tr>
                                    
                                                </>

                                            );
                                            })}
                                            {dex.length === 0 && (
                                        <Tr>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">No Data Available For Now</Text></Td>
                                        </Tr>
                                    )}
                                        </>
                                    }
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider />
                        <IconButton
                            icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => {
                                if (display == 'show') {
                                    changeDisplay('none')
                                } else {
                                    changeDisplay('show')
                                }
                            }}
                        />
                        <Divider />
                    </Flex>
                </Flex>
                <Heading letterSpacing="tight" size="md" my={4}>Send money to</Heading>
                <Flex>
                    <AvatarGroup size="md" max={3}>
                        <Avatar src="avatar-2.jpg" />
                        <Avatar src="avatar-3.jpg" />
                        <Avatar src="avatar-4.jpg" />
                        <Avatar src="avatar-4.jpg" />
                        <Avatar src="avatar-4.jpg" />
                    </AvatarGroup>
                    <Avatar icon={<FiPlus />} ml={2} color="#fff" bgColor="gray.300" />
                </Flex>
                <Text color="gray" mt={10} mb={2}>Card number</Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiCreditCard color="gray.700" />}
                    />
                    <Input type="number" placeholder="xxxx xxxx xxxx xxxx" />
                </InputGroup>
                <Text color="gray" mt={4} mb={2}>Sum</Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiDollarSign color="gray.700" />}
                    />
                    <Input type="number" placeholder="130.00" />
                </InputGroup>
                <Button mt={4} bgColor="blackAlpha.900" color="#fff" p={7} borderRadius={15}>Send money</Button>
            </Flex>
        </Flex>
    )
}