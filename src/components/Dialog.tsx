import React, {Component} from "react";
import {Modal, View, StyleSheet, Dimensions} from "react-native";

const {width} = Dimensions.get('window')

interface DialogProps {
  visible: boolean,
  footer: Function
}

class Dialog extends Component<DialogProps>{
  static defaultProps = {
    visible: false
  };

  render() {
    const {visible, footer} = this.props;

    return (
      <Modal
        transparent
        animationType="fade"
        visible={visible}
      >
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <View>
              {this.props.children}
            </View>
            <View style={styles.footer}>
              {footer()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center'
  },
  modalBox: {
    borderRadius: 8,
    width: width - 50,
    marginHorizontal: 25,
    backgroundColor: '#ffffff',
    padding: 20
  },
  footer: {
    marginTop: 30
  }
});

export default Dialog;
