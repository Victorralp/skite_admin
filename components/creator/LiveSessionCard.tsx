'use client';

export default function LiveSessionCard() {
    return (
        <div 
            className="flex flex-col items-start"
            style={{
                padding: '0px',
                gap: '8px',
                isolation: 'isolate',
                width: '515px',
                height: '247px'
            }}
        >
            {/* Title */}
            <h3 style={{
                width: '515px',
                height: '19px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#2B2834',
                zIndex: 1
            }}>Live Session</h3>
            
            {/* Card Container */}
            <div 
                className="box-border flex flex-col items-start overflow-hidden"
                style={{
                    padding: '0px',
                    width: '515px',
                    height: '220px',
                    background: '#FFFFFF',
                    border: '1px solid #EBEBEB',
                    borderRadius: '12px',
                    flex: 'none',
                    alignSelf: 'stretch',
                    flexGrow: 1,
                    zIndex: 0
                }}
            >
                {/* Main Content */}
                <div 
                    className="flex flex-col items-start"
                    style={{
                        padding: '16px',
                        gap: '16px',
                        width: '515px',
                        height: '159px',
                        flex: 'none',
                        alignSelf: 'stretch',
                        flexGrow: 1
                    }}
                >
                    <div 
                        className="flex flex-row items-start"
                        style={{
                            padding: '0px',
                            gap: '12px',
                            width: '483px',
                            height: '127px',
                            flex: 'none',
                            alignSelf: 'stretch',
                            flexGrow: 1
                        }}
                    >
                        {/* Video Thumbnail */}
                        <div 
                            className="flex flex-row items-start"
                            style={{
                                padding: '8px',
                                gap: '10px',
                                width: '199.01px',
                                height: '127px',
                                background: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=127&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            {/* Live Badge */}
                            <div 
                                className="flex flex-row items-center"
                                style={{
                                    padding: '4px 6px',
                                    gap: '2px',
                                    width: '42.26px',
                                    height: '22px',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    borderRadius: '100px'
                                }}
                            >
                                <div style={{
                                    width: '6.26px',
                                    height: '6.26px',
                                    background: '#CD110A',
                                    borderRadius: '50%'
                                }} />
                                <span style={{
                                    width: '22px',
                                    height: '14px',
                                    fontFamily: 'Neue Montreal',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    lineHeight: '14px',
                                    color: '#CD110A'
                                }}>Live</span>
                            </div>
                        </div>

                        {/* Session Details */}
                        <div 
                            className="flex flex-col justify-between items-start"
                            style={{
                                padding: '0px',
                                gap: '12px',
                                width: '271.99px',
                                height: '127px'
                            }}
                        >
                            <h4 style={{
                                margin: '0 auto',
                                width: '271.99px',
                                height: '19px',
                                fontFamily: 'Neue Montreal',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#2B2834'
                            }}>Skit Production Masterclass</h4>

                            {/* Action Buttons */}
                            <div 
                                className="flex flex-row items-center"
                                style={{
                                    padding: '0px',
                                    gap: '4px',
                                    margin: '0 auto',
                                    width: '237px',
                                    height: '28px'
                                }}
                            >
                                <button 
                                    className="box-border flex flex-row justify-center items-center"
                                    style={{
                                        padding: '14px 16px',
                                        gap: '4px',
                                        width: '128px',
                                        height: '28px',
                                        background: '#FFFFFF',
                                        border: '1px solid #EBEBEB',
                                        boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)',
                                        borderRadius: '9px'
                                    }}
                                >
                                    <span style={{
                                        width: '96px',
                                        height: '16px',
                                        fontFamily: 'Neue Montreal',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '13.5px',
                                        lineHeight: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: '#353A44',
                                        textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)'
                                    }}>Monitor Session</span>
                                </button>

                                <button 
                                    className="box-border flex flex-row justify-center items-center"
                                    style={{
                                        padding: '14px 16px',
                                        gap: '4px',
                                        width: '105px',
                                        height: '28px',
                                        background: '#CD110A',
                                        border: '1px solid rgba(251, 236, 235, 0.2)',
                                        boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)',
                                        borderRadius: '9px'
                                    }}
                                >
                                    <span style={{
                                        width: '73px',
                                        height: '16px',
                                        fontFamily: 'Neue Montreal',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '13.5px',
                                        lineHeight: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: '#FFFCF8',
                                        textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)'
                                    }}>End Session</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    width: '515px',
                    height: '0px',
                    border: '1px solid #EBEBEB',
                    flex: 'none',
                    alignSelf: 'stretch',
                    flexGrow: 0
                }} />

                {/* Stats Row */}
                <div 
                    className="flex flex-row items-center"
                    style={{
                        padding: '12px 16px',
                        gap: '4px',
                        width: '515px',
                        height: '61px',
                        flex: 'none',
                        alignSelf: 'stretch',
                        flexGrow: 0
                    }}
                >
                    {/* Started */}
                    <div 
                        className="flex flex-col items-center"
                        style={{
                            padding: '0px',
                            gap: '5px',
                            width: '114.75px',
                            height: '37px'
                        }}
                    >
                        <span style={{
                            width: '114.75px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            textAlign: 'center',
                            color: '#5F5971'
                        }}>Started</span>
                        <span style={{
                            width: '114.75px',
                            height: '18px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '15px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            color: '#2B2834'
                        }}>10:47 AM</span>
                    </div>

                    {/* Divider */}
                    <div style={{
                        width: '0px',
                        height: '26.05px',
                        borderLeft: '1px solid #EBEBEB',
                        flexShrink: 0
                    }} />

                    {/* Participants */}
                    <div 
                        className="flex flex-col items-center"
                        style={{
                            padding: '0px',
                            gap: '5px',
                            width: '114.75px',
                            height: '37px'
                        }}
                    >
                        <span style={{
                            width: '114.75px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            textAlign: 'center',
                            color: '#5F5971'
                        }}>Participants</span>
                        <span style={{
                            width: '114.75px',
                            height: '18px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '15px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            color: '#2B2834'
                        }}>2</span>
                    </div>

                    {/* Divider */}
                    <div style={{
                        width: '0px',
                        height: '26.05px',
                        borderLeft: '1px solid #EBEBEB',
                        flexShrink: 0
                    }} />

                    {/* Viewers */}
                    <div 
                        className="flex flex-col items-center"
                        style={{
                            padding: '0px',
                            gap: '5px',
                            width: '114.75px',
                            height: '37px'
                        }}
                    >
                        <span style={{
                            width: '114.75px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            textAlign: 'center',
                            color: '#5F5971'
                        }}>Viewers</span>
                        <span style={{
                            width: '114.75px',
                            height: '18px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '15px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            color: '#2B2834'
                        }}>24</span>
                    </div>

                    {/* Divider */}
                    <div style={{
                        width: '0px',
                        height: '26.05px',
                        borderLeft: '1px solid #EBEBEB',
                        flexShrink: 0
                    }} />

                    {/* Chat Messages */}
                    <div 
                        className="flex flex-col items-center"
                        style={{
                            padding: '0px',
                            gap: '5px',
                            width: '114.75px',
                            height: '37px'
                        }}
                    >
                        <span style={{
                            width: '114.75px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            textAlign: 'center',
                            color: '#5F5971'
                        }}>Chat Messages</span>
                        <span style={{
                            width: '114.75px',
                            height: '18px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '15px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            color: '#2B2834'
                        }}>23</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
