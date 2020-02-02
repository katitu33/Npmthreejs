import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalContent = styled.div`
    color: #b0a9a9;
    .pkg {
        font-size: 24px;
        color: #39ff15;
        padding-bottom: 10px;
    }
    .description {
        text-overflow: ellipsis;
        font-style: italic;
        padding-bottom: 10px;
    }
    
    .close {
        position: absolute;
        top: 22px;
        right: 22px;
        font-size: 24px;
        cursor: pointer;
    }
    
    ul {
      list-style: none;
      padding: 0;
    }
    
    li {
      display: flex;
      flex-direction: column;
      padding-bottom: 5px;
      
      span {
        padding-bottom: 5px;
      }
      .title {
          font-weight: bold;
      }
      a {
          color: #53dc3d;
      }
    }
`

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '75%',
        'max-height'          : '75%',
        overflow              : 'scroll'
    }
};

const VulnDetailsModal = ({
    onClose,
    selectedVuln: {
        pkg,
        pkgDescription,
        vulns
    }
}) => {
    return (
        <Modal
            isOpen
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Vuln Details"
            shouldCloseOnOverlayClick
        >
            <ModalContent>
                <span
                    className="close"
                    onClick={onClose}>
                    X
                </span>
                <div className="pkg">{pkg}</div>
                <div className="description">{pkgDescription}</div>
                <ul>
                    {
                        vulns.map(vuln => {
                            return (
                                <li
                                    key={vuln.id}
                                >
                                    <span className="title">{vuln.title}</span>
                                    <span>{vuln.description}</span>
                                    <span>
                                        <a
                                            target="_blank"
                                            href={vuln.reference}
                                        >
                                            Reference
                                        </a>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </ModalContent>
        </Modal>
    );
};

VulnDetailsModal.propTypes = {};

export default VulnDetailsModal;

