/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {NavigationContainer} from '@react-navigation/native';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
  ActivityIndicator,
  MD2Colors,
  Card,
} from 'react-native-paper';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';

import {type FormData} from '@/../../src/schema/login';

import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {signIn} from './src/api/client';
import {getProducts} from './src/api/hooks/products/useQueryProducts';

const queryClient = new QueryClient();

function Home() {
  const [visible, setVisible] = useState(false);

  // const {} = useQuery()

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const form = useForm<FormData>();
  const {data: Products, isLoading} = useQuery({
    queryFn: () => getProducts(),
    queryKey: ['queryProducts'],
  });

  console.log(Products);

  const _products = Products ?? [];

  const {mutate: MutationFn} = useMutation({
    mutationFn: (data: FormData) => {
      signIn({username: data.username, password: data.password})
        .then(res => {
          if (res.success) {
            Alert.alert(res.message);
          } else if (res.message) {
            Alert.alert(res.message);
          }
          console.log(res.message);

          hideModal();
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error('Login failed', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    MutationFn({username: data.username, password: data.password});
  };

  useEffect(() => {
    showModal();
  }, []);
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Controller
            name="username"
            control={form.control}
            render={({field, formState: {errors}}) => {
              return (
                <>
                  <TextInput
                    {...field}
                    label="Email"
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                  />
                  <Text>
                    {' '}
                    {errors.username?.message && <Text>輸入錯誤</Text>}{' '}
                  </Text>
                </>
              );
            }}
          />

          <Controller
            name="password"
            control={form.control}
            render={({field, formState: {errors}}) => {
              return (
                <>
                  <TextInput
                    {...field}
                    label="密碼"
                    inputMode="text"
                    secureTextEntry
                    keyboardType="visible-password"
                    value={field.value}
                    onChangeText={field.onChange}
                  />

                  <Text>
                    {' '}
                    {errors.password?.message && <Text>輸入錯誤</Text>}{' '}
                  </Text>
                </>
              );
            }}
          />

          <Button onPress={form.handleSubmit(onSubmit)}>
            登入
            {isLoading && (
              <ActivityIndicator animating={true} color={MD2Colors.red800} />
            )}
          </Button>
        </Modal>
      </Portal>
      {/* <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button> */}
      <ScrollView>
        {/* {_products &&
          _products?.map((item, index) => (
            <ProductCard key={`product-${index}`} />
          ))} */}

        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ScrollView>
    </PaperProvider>
  );
}

function ProductCard() {
  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}

function EditPost() {
  return (
    <View>
      <Text>EditPost</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.viewContainer}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={EditPost} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexBasis: '1',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
