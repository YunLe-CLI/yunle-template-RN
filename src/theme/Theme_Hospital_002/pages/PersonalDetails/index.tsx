import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Footer,
  Card,
  CardItem,
  Text,
  Item, Input, Form,
  Icon,
  Textarea,
} from 'native-base';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {OrientationType} from "react-native-orientation-locker";
import LinearGradient from "react-native-linear-gradient";
import {PATIENTS_DETAILS, PATIENTS_INFO_PUT} from '../../services/api';
import { withSelectDateTimeModal } from '@/theme/Theme_Hospital_002/components/SelectTimeModal';
import { withSelectGenderModal } from '@/theme/Theme_Hospital_002/components/SelectGenderModal';
import moment from 'moment';
import _ from 'lodash';
export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect(({ user }) => {
  return { user: user.info }
}) as any)
class Home extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
  }

  state = {
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    }
  };

  componentDidMount(): void {
    this.getUserInfo();
  }

  async postData() {
    try {
      const { user } = this.props;
      const res = await PATIENTS_INFO_PUT({
        id: user.id,
        "name": this.state.name,// 【必须】
        "idCard":this.state.idCard,// 身份证
        "birthdate":moment(this.state.birthdate).format('X') - 0,// 生日
        "gender":this.state.gender - 0,// 性别（1-男 2-女）
        "age":this.state.age - 0,// 年龄
        "medicalHistory":this.state.medicalHistory,// 病史
      })
      if (res.code === 0) {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'Home',
          params: {},
        }))
      } else {
        throw res.msg
      }
    } catch (e) {
      alert(e)
    } finally {
      this.getUserInfo()
    }
  }

  async getUserInfo() {
    try {
      const userRes = await PATIENTS_DETAILS({});
      if (userRes.code === 0) {
        const userInfo = await this.props.dispatch({
          type: 'user/setUserAsync',
          payload: {
            user: userRes.data,
          }
        });
        const { data = {} } = userRes;
        this.setState({
          "name": data.name,// 【必须】
          "idCard":data.idCard,// 身份证
          "birthdate":data.birthdate,// 生日
          "gender":data.gender - 0,// 性别（1-男 2-女）
          "age": data.age + '',// 年龄
          "medicalHistory": data.medicalHistory,// 病史
        })
      } else {
        throw userRes.msg
      }

    } catch (e) {
      alert(e)
    }
  }

  renderForm() {
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            <Text style={{ color: '#FE0E07' }}>*</Text>
            姓名</Text>
          <Input value={this.state.name} style={styles.ipt} placeholder="请输入姓名" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     name: value,
                   })
                 }}
          />
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>年龄</Text>
          <Input value={this.state.age} style={styles.ipt} placeholder="请输入年龄" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     age: value,
                   })
                 }}
          />
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
          <Text style={{ color: '#FE0E07' }}>*</Text>
            身份证号</Text>
          <Input value={this.state.idCard} style={styles.ipt} placeholder="请输入身份证号" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     idCard: value,
                   })
                 }}
          />
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
          <Text style={{ color: '#FE0E07' }}>*</Text>
            手机号</Text>
          <Input value={this.state.phone} style={styles.ipt} placeholder="请输入身份证号" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                    phone: value,
                   })
                 }}
          />
        </CardItem>
      
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>过敏史</Text>
          <View style={{ flex: 1, flexGrow: 1, }}>
            <Input value={this.state.medicalHistory}
                      onChangeText={(value) => {
                        this.setState({
                          medicalHistory: value,
                        })
                      }}
                      style={styles.ipt}
                      placeholderTextColor={"#9C9EB9"} placeholder="请输入过敏史" />
          </View>
        </CardItem>
      </Card>
    </View>
  }

  render() {
    const { orientationType } = this.state;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={async payload => {
            try {
              this.componentDidMount()
            } catch (e) {

            }
            await this.componentDidMount();
          }}
          onDidFocus={async payload => {

          }}
          onWillBlur={payload => {

          }}
          onDidBlur={payload => {

          }}
        />
        <Header
          style={styles.header}
        >
          <Left/>
          <Body>
            <Title style={styles.headerText}>完善个人信息</Title>
          </Body>
          <Right/>
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content
          disableKBDismissScroll
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          {this.renderForm()}
        </Content>
        <Footer
          style={styles.footerWrap}
        >
          <View style={styles.btnWrap}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#5277F1', '#5277F1']}
              style={[
                styles.linearGradientBtn,
                {
                  opacity:
                    this.state.name &&
                    this.state.idCard &&
                    this.state.birthdate &&
                    this.state.age ?
                      1 : 0.4
                }
              ]}
            >
              <Button
                full
                transparent
                rounded
                onPress={async () => {
                  this.postData()
                }}
                style={styles.submitButton}
                textStyle={{
                  color: '#fff'
                }}
              >
                <Title>完成</Title>
              </Button>
            </LinearGradient>
          </View>
        </Footer>
      </Container>
    );
  }
}
export default withSelectGenderModal(withSelectDateTimeModal(Home));
