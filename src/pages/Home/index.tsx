import React from 'react';
import { connect } from 'react-redux';
import {Container, Header, Left, Body, Right, Title, Content} from 'native-base';
import styles from './styles';
import { NavigationEvents } from 'react-navigation';

export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

  state = {
  };

  render() {
    return (
      <Container style={styles.container}>
      <NavigationEvents
          onWillFocus={payload => console.log('will focus', payload)}
          onDidFocus={payload => console.log('did focus', payload)}
          onWillBlur={payload => console.log('will blur', payload)}
          onDidBlur={payload => console.log('did blur', payload)}
      />
        <Header>
          <Left/>
          <Body>
              <Title>首页</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          
        </Content>
      </Container>
    );
  }
}
export default Home;
