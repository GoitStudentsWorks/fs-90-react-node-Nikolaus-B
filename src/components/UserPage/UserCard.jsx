import {
  AvatarIcon,
  AddAvatarIcon,
  FoodIcon,
  DumbBellIcon,
  LogOut,
  ExclamationMarkIcon,
} from './styles/Icon.styled.js';
import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

//------------------------------------------------
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth } from 'components/hooks/AuthHook.js';
import {
  fetchUserLogout,
  fetchUserCurrent,
  fetchUserAvatars,
} from '../../redux/user/operations.js';

//------------------------------------------------

export const UserCard = () => {
  const dispatch = useDispatch();
  const { user, bmr, dailyRateSports } = useAuth();

  useEffect(() => {
    dispatch(fetchUserCurrent());
  }, [dispatch]);

  //-------setAvatar---------

  const [selectedAvatar, setAvatar] = useState(null);

  const handleAvatarChange = e => {
    const avatar = e.target.files[0];
    setAvatar(avatar);
  };

  const appendAvatar = () => {
    if (selectedAvatar) {
      const formData = new FormData();
      formData.append('avatarURL', selectedAvatar);

      <Alert status="success" variant="top-accent">
        <AlertIcon status="warning" />
        Avatar uploaded successfully
      </Alert>;
    } else {
      <Alert status="error" variant="top-accent">
        <AlertIcon status="warning" />
        No file selected
      </Alert>;
    }
  };

  return (
    <Stack>
      <VStack spacing={{ base: '40px', md: '32px' }}>
        <VStack spacing="32px">
          <VStack>
            <Avatar
              icon={
                <AvatarIcon iconid={'avatar'} width={'38px'} height={'38px'} />
              }
              pos="relative"
              w={{ base: '90px', md: '150px' }}
              h={{ base: '90px', md: '150px' }}
            >
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAvatarChange}
                //---------------------------
                pos="absolute"
                width="75px"
                height="auto"
                p="0"
                right="-150px"
                variant="unstyled"
              />
              <IconButton
                type="button"
                onClick={() => dispatch(fetchUserAvatars(appendAvatar))}
                //---------------------------
                icon=<AddAvatarIcon
                  iconid="add-avatar"
                  width="38px"
                  height="38px"
                />
                fontSize="24px"
                pos="absolute"
                right={{ base: '22px', md: '50px' }}
                bottom={{ base: '-18px', md: '-18px' }}
                p="0"
                variant="unstyled"
              />
            </Avatar>
          </VStack>

          <VStack>
            <Text
              fontSize={{ base: '18px', md: '24px' }}
              lineHeight={{ base: '111%', md: '117%' }}
              mb={{ base: '4px', mb: '8px' }}
            >
              {user.name}
            </Text>
            <Badge display="inline-flex" fontSize="14px" lineHeight="129%">
              User
            </Badge>
          </VStack>
        </VStack>

        <HStack spacing={{ base: '12px', md: '16px' }}>
          <Card
            direction="column"
            justify="space-between"
            align="flex-start"
            w={{ base: '165px', md: '214px', xl: '209px' }}
            h={{ base: '96px', md: '108px' }}
          >
            <CardHeader>
              <HStack>
                <FoodIcon iconid={'food'} width={'20px'} height={'20px'} />
                <Text
                  color="rgba(239, 237, 232, 0.8)"
                  lineHeight={{ base: '133%', md: '150%' }}
                >
                  Daily calorie intake
                </Text>
              </HStack>
            </CardHeader>
            <CardFooter>
              <Text lineHeight={{ base: '111%', md: '133%' }}>{bmr} min</Text>
            </CardFooter>
          </Card>
          <Card
            direction="column"
            justify="space-between"
            align="flex-start"
            w={{ base: '165px', md: '214px', xl: '209px' }}
            h={{ base: '96px', md: '108px' }}
          >
            <CardHeader>
              <HStack>
                <DumbBellIcon
                  iconid={'dumbbell'}
                  width={'20px'}
                  height={'20px'}
                />
                <Text
                  color="rgba(239, 237, 232, 0.8)"
                  line-height={{ base: '133%', md: '150%' }}
                >
                  Daily physical activity
                </Text>
              </HStack>
            </CardHeader>
            <CardFooter>
              <Text lineHeight={{ base: '111%', md: '133%' }}>
                {dailyRateSports} min
              </Text>
            </CardFooter>
          </Card>
        </HStack>

        <HStack spacing={2} align="flex-start">
          <Stack
            justify="center"
            align="center"
            borderRadius="50px"
            boxSize="24px"
            bgColor="#efa082"
          >
            <ExclamationMarkIcon
              iconid={'exclamation-mark'}
              width={'2px'}
              height={'16px'}
            />
          </Stack>
          <Text
            w={{ base: '303px', md: '407px' }}
            h="73px"
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '129%', md: '150%' }}
          >
            We understand that each individual is unique, so the entire approach
            to diet is relative and tailored to your unique body and goals.
          </Text>
        </HStack>

        <Button
          type="button"
          onClick={() => dispatch(fetchUserLogout())}
          rightIcon={
            <LogOut iconid={'log-out'} width={'20px'} height={'20px'} />
          }
          display="inline-flex"
          alignContent="center"
          alignSelf="flex-end"
          iconSpacing="8px"
          h="auto"
          p="0"
          fontSize={{ base: '14px', md: '16px' }}
          fontWeight="normal"
          variant="unstyled"
        >
          Logout
        </Button>
      </VStack>
    </Stack>
  );
};
