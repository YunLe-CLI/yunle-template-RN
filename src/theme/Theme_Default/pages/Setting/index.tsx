import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { withCheckAppUpdate } from '@Global/components/CheckAppUpdate'
import { withLoginModal } from '../../components/LoginModal'

export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
        list: []
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                const { dispatch } = this.props;
                                dispatch(NavigationActions.back());
                            }}
                        >
                            <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>设置</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ paddingHorizontal: 12 }}>
                    <List>
                        <ListItem onPress={async () => {
                            await this.props.handleCheckAppUpdate()
                        }}>
                            <Text>检查更新</Text>
                        </ListItem>
                        <ListItem onPress={async () => {
                            this.setState({
                                list: ''
                            })
                        }}>
                           <Text>throw error 001</Text>
                        </ListItem>
                    </List>
                    <Button
                        style={{
                            marginTop: 20,
                            justifyContent: 'center'
                        }}
                        onPress={async () => {
                            const { dispatch } = this.props;
                            dispatch({
                                type: 'auth/logout'
                            });
                            this.props.openLoginModal()
                        }}
                    >
                        <Title>推出登陆</Title>
                    </Button>
                    {
                        this.state.list.map(() => {
                            return <View/>
                        })
                    }
                </Content>
            </Container>
        );
    }
}
export default withCheckAppUpdate(withLoginModal(Home));
