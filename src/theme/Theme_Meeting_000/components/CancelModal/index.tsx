import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';

import nativeAutoUpdate, { handleDownload } from "@/utils/native-auto-update";
import moment from 'moment';

export const CheckAppUpdateContext = createContext({
  handleShowCancelModal: () => {}
})
export const CancelModalConsumer = CheckAppUpdateContext.Consumer

export function withCancelModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <CancelModalConsumer>
          {
            ({ handleShowCancelModal }) => {
              return <WrappedComponent  {...this.props} handleShowCancelModal={handleShowCancelModal} />
            }
          }
        </CancelModalConsumer>
      </>
    }
  }
}

export interface IState {
  isModalVisible: boolean;
  isNotRemind: boolean;
  isModalNotVisible: boolean;
  updateURI: undefined | string;
}
class CancelModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  state: IState = {
    isModalVisible: false,
  };

  showModel = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
    })
  };


  async componentDidMount() {

  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;
    return (
      <CheckAppUpdateContext.Provider value={{
        handleShowCancelModal: async ({ startTime, endTime }, onCallBack) => { {
          this.showModel()
          this.setState({
            startTime,
            endTime
          })
          this.onCallBack = onCallBack;
        } }
      }}>
        {this.props.children}
        <Modal
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          isVisible={isModalVisible}
          onBackButtonPress={() => {
            this.closeModel(undefined)
          }}
          onBackdropPress={() => {

          }}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View style={{
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
          }}>
              <View>
                <View>
                  <Text style={styles.title}>
                    提醒
                  </Text>
                  <Text style={styles.infoText}>
                    是否确认取消
                  </Text>
                  <Text style={styles.infoText}>
                    {moment(this.state.startTime).format('YYYY年MM月DD日HH:mm')}
                    -
                    {moment(this.state.endTime).format('HH:mm')}
                    的会议？
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                      full
                      bordered
                      onPress={async () => {
                        this.setState({
                          isNotRemind: true,
                        }, () => {
                          this.closeModel();
                        })
                      }}
                      style={styles.btn}
                  >
                    <Text style={[styles.btnText]}>取消</Text>
                  </Button>
                  <View style={{ width: 1, height: 50, backgroundColor: '#F2F2F2' }} />
                  <Button
                      transparent
                      full
                      bordered
                      onPress={async () => {
                        this.closeModel();
                        if (this.onCallBack) {
                          this.onCallBack()
                        }
                      }}
                      style={styles.btn}
                  >
                    <Text style={[styles.btnText, styles.okText]}>确定</Text>
                  </Button>
                </View>
              </View>
          </View>
        </Modal>
      </CheckAppUpdateContext.Provider>
    );
  }
}

export default CancelModalProvider
