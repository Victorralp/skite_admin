"use client";

import { Edit2 } from 'lucide-react';

export default function ProfileContent() {
  return (
    <div 
      className="bg-white"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px 64px',
        gap: '32px',
        width: '1230px',
        height: '544px',
        background: '#FFFFFF'
      }}
    >
      {/* Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '24px',
          width: '1102px',
          height: '496px'
        }}
      >
        {/* Page Title */}
        <h1 
          style={{
            width: '59px',
            height: '24px',
            fontFamily: 'Neue Montreal',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#2B2834'
          }}
        >
          Profile
        </h1>

        {/* Main Content Container */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '24px 104px',
            gap: '24px',
            width: '1102px',
            height: '448px'
          }}
        >
          {/* Left Column - Profile Card */}
          <div 
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '32px',
              gap: '16px',
              width: '260px',
              height: '260px',
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              borderRadius: '16px'
            }}
          >
            {/* Profile Image Container */}
            <div 
              style={{
                position: 'relative',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: '0px',
                gap: '26.04px',
                width: '120px',
                height: '120px',
                background: 'url(.png)',
                border: '1px solid #EBEBEB',
                borderRadius: '100px'
              }}
            >
              {/* Change Button */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '4px 8px 6px',
                  gap: '4px',
                  width: '120px',
                  height: '22px',
                  background: '#FFFFFF',
                  border: '1px solid #F0EBF4',
                  borderRadius: '6px'
                }}
              >
                <span 
                  style={{
                    width: '35px',
                    height: '12px',
                    fontFamily: 'Neue Montreal',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '12px',
                    color: '#2B2834'
                  }}
                >
                  Change
                </span>
              </div>
            </div>

            {/* Name and Contact Info */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '2px',
                width: '140px',
                height: '60px'
              }}
            >
              <h2 
                style={{
                  width: '112px',
                  height: '24px',
                  fontFamily: 'Neue Montreal',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '-0.01em',
                  color: '#2B2834'
                }}
              >
                Martha Craig
              </h2>
              <p 
                style={{
                  width: '140px',
                  height: '16px',
                  fontFamily: 'Neue Montreal',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '13.5px',
                  lineHeight: '16px',
                  color: '#5F5971'
                }}
              >
                Martha Craig
              </p>
              <p 
                style={{
                  width: '83px',
                  height: '16px',
                  fontFamily: 'Neue Montreal',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '13.5px',
                  lineHeight: '16px',
                  color: '#5F5971'
                }}
              >
                Martha Craig
              </p>
            </div>
          </div>

          {/* Right Column - Account Information */}
          <div 
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '32px',
              gap: '24px',
              width: '610px',
              height: '400px',
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              borderRadius: '16px'
            }}
          >
            {/* Account Information Title */}
            <h3 
              style={{
                width: '182px',
                height: '24px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '24px',
                letterSpacing: '-0.01em',
                color: '#2B2834'
              }}
            >
              Account Information
            </h3>

            {/* Account Information Fields */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '18px',
                width: '546px',
                height: '96px'
              }}
            >
              {/* Email Field */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '546px',
                  height: '39px'
                }}
              >
                <span 
                  style={{
                    width: '39px',
                    height: '19px',
                    fontFamily: 'Neue Montreal',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#2B2834'
                  }}
                >
                  Email
                </span>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    width: '546px',
                    height: '16px'
                  }}
                >
                  <span 
                    style={{
                      width: '140px',
                      height: '16px',
                      fontFamily: 'Neue Montreal',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '13.5px',
                      lineHeight: '16px',
                      color: '#5F5971'
                    }}
                  >
                    Martha Craig
                  </span>
                  <Edit2 
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#5F5971'
                    }}
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '546px',
                  height: '39px'
                }}
              >
                <span 
                  style={{
                    width: '105px',
                    height: '19px',
                    fontFamily: 'Neue Montreal',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#2B2834'
                  }}
                >
                  Phone Number
                </span>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    width: '546px',
                    height: '16px'
                  }}
                >
                  <span 
                    style={{
                      width: '83px',
                      height: '16px',
                      fontFamily: 'Neue Montreal',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '13.5px',
                      lineHeight: '16px',
                      color: '#5F5971'
                    }}
                  >
                    Martha Craig
                  </span>
                  <Edit2 
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#5F5971'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div 
              style={{
                width: '546px',
                height: '0px',
                border: '1px solid #EBEBEB'
              }}
            />

            {/* Security Title */}
            <h3 
              style={{
                width: '76px',
                height: '24px',
                fontFamily: 'Neue Montreal',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '24px',
                letterSpacing: '-0.01em',
                color: '#2B2834'
              }}
            >
              Security
            </h3>

            {/* Security Fields */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '18px',
                width: '546px',
                height: '96px'
              }}
            >
              {/* Password Field */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '546px',
                  height: '39px'
                }}
              >
                <span 
                  style={{
                    width: '69px',
                    height: '19px',
                    fontFamily: 'Neue Montreal',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#2B2834'
                  }}
                >
                  Password
                </span>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    width: '546px',
                    height: '16px'
                  }}
                >
                  <span 
                    style={{
                      width: '79px',
                      height: '16px',
                      fontFamily: 'Neue Montreal',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '13.5px',
                      lineHeight: '16px',
                      color: '#5F5971'
                    }}
                  >
                    Password Set
                  </span>
                  <Edit2 
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#5F5971'
                    }}
                  />
                </div>
              </div>

              {/* Two-Factor Authentication Field */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '546px',
                  height: '39px'
                }}
              >
                <span 
                  style={{
                    width: '191px',
                    height: '19px',
                    fontFamily: 'Neue Montreal',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#2B2834'
                  }}
                >
                  Two - Factor Authentication
                </span>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    width: '546px',
                    height: '16px'
                  }}
                >
                  <span 
                    style={{
                      width: '48px',
                      height: '16px',
                      fontFamily: 'Neue Montreal',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '13.5px',
                      lineHeight: '16px',
                      color: '#5F5971'
                    }}
                  >
                    Enabled
                  </span>
                  <Edit2 
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#5F5971'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}