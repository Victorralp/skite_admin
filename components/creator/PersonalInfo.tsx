'use client';

type PersonalInfoProps = {
    creator: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        phone?: string;
        dob?: string;
        gender?: string;
        location?: string;
        joinDate?: string;
    };
};

export default function PersonalInfo({ creator }: PersonalInfoProps) {
    return (
        <div 
            className="flex flex-col justify-center items-center"
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
            }}>Personal Info</h3>

            {/* Container */}
            <div 
                className="flex flex-col items-start"
                style={{
                    padding: '4px',
                    gap: '4px',
                    width: '515px',
                    height: '220px',
                    borderRadius: '8px',
                    zIndex: 0
                }}
            >
                {/* First Name */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.2 14C13.2 11.2386 10.8719 9 8 9C5.12812 9 2.8 11.2386 2.8 14" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '56px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>First Name</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>Noah</span>
                </div>

                {/* Last Name */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.2 14C13.2 11.2386 10.8719 9 8 9C5.12812 9 2.8 11.2386 2.8 14" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '55px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>Last Name</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>Smith</span>
                </div>

                {/* User Name */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.2 14C13.2 11.2386 10.8719 9 8 9C5.12812 9 2.8 11.2386 2.8 14" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '58px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>User Name</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>@noahsmith</span>
                </div>

                {/* Email Address */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H12C12.55 4 13 4.45 13 5V11C13 11.55 12.55 12 12 12H4C3.45 12 3 11.55 3 11V5C3 4.45 3.45 4 4 4Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 4L8 8L12 4" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '73px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>Email Address</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>Noahsmith@email.com</span>
                </div>

                {/* Date of Birth */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6667 3.33333H3.33333C2.59695 3.33333 2 3.93029 2 4.66667V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4.66667C14 3.93029 13.403 3.33333 12.6667 3.33333Z" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.6667 2V4.66667" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.33333 2V4.66667" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 7.33333H14" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '64px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>Date of Birth</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>08/06/1990</span>
                </div>

                {/* Gender */}
                <div 
                    className="box-border flex flex-row items-center"
                    style={{
                        padding: '0px 16px',
                        gap: '16px',
                        width: '507px',
                        height: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4px'
                    }}
                >
                    <div 
                        className="flex flex-row items-center"
                        style={{
                            padding: '0px',
                            gap: '8px',
                            width: '97px',
                            height: '16px'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="6.66667" cy="9.33333" r="4" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.33333 6.66667L13.3333 2.66667" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 2.66667H13.3333V6" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{
                            width: '39px',
                            height: '14px',
                            fontFamily: 'Neue Montreal',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#5F5971'
                        }}>Gender</span>
                    </div>
                    <div style={{
                        width: '0px',
                        height: '32px',
                        border: '1px solid #EBEBEB'
                    }} />
                    <span style={{
                        width: '346px',
                        height: '16px',
                        fontFamily: 'Neue Montreal',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '13.5px',
                        lineHeight: '16px',
                        color: '#2B2834'
                    }}>Male</span>
                </div>
            </div>
        </div>
    );
}

