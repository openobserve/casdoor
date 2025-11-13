// Copyright 2021 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Result, Spin} from "antd";
import i18next from "i18next";
import {authConfig} from "./Auth";
import * as ApplicationBackend from "../backend/ApplicationBackend";
import * as Setting from "../Setting";

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      applicationName: props.match.params.applicationName !== undefined ? props.match.params.applicationName : authConfig.appName,
      application: null,
    };
  }

  UNSAFE_componentWillMount() {
    if (this.state.applicationName !== undefined) {
      this.getApplication();
    } else {
      Setting.showMessage("error", `Unknown application name: ${this.state.applicationName}`);
    }
  }

  getApplication() {
    if (this.state.applicationName === undefined) {
      return;
    }

    ApplicationBackend.getApplication("admin", this.state.applicationName)
      .then((res) => {
        if (res.status === "error") {
          Setting.showMessage("error", res.msg);
          return;
        }

        this.onUpdateApplication(res.data);
        this.setState({
          application: res.data,
        });
      });
  }

  onUpdateApplication(application) {
    this.props.onUpdateApplication(application);
  }

  render() {
    const application = this.state.application;

    if (application === null) {
      return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Spin size="large" tip={i18next.t("login:Loading")} style={{paddingTop: "10%"}} />
        </div>
      );
    }

    return (
      <div className="dex-login-container">
        {/* Background elements matching ForgetPage */}
        <div className="bg-container"></div>
        <div className="metrics-overlay">
          <div className="metric-line metric-line-1"></div>
          <div className="metric-line metric-line-2"></div>
          <div className="metric-line metric-line-3"></div>
        </div>
        <div className="grid-bg"></div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Left side with logo and text */}
        <div className="login-brand-section">
          <div className="brand-container">
            <div className="brand-logo">
              {Setting.renderLogo(application)}
            </div>
            <div className="brand-content">
              <p className="brand-subtitle">The complete observability platform for modern applications</p>
              <div className="brand-features">
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Real-time monitoring and analytics</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔍</span>
                  <span>Advanced search and visualization</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>High performance and scalability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with result */}
        <div className="login-form-section">
          <div className="login-content-container">
            <div className="modern-bordered-panel" style={{marginTop: "80px"}}>
              {Setting.renderHelmet(application)}
              <Result
                status="success"
                title={<span style={{color: "#f1f5f9"}}>{i18next.t("signup:Your account has been created!")}</span>}
                subTitle={<span style={{color: "#cbd5e1"}}>You can now close this page and sign in through your application.</span>}
              />
            </div>

            {/* Footer matching ForgetPage */}
            <div className="page-footer">
              <div style={{display: "flex", gap: "12px", alignItems: "center", justifyContent: "center", marginBottom: "12px"}}>
                <a className="modern-link" href="/terms" target="_blank" rel="noreferrer">Terms of Use
                  <img src={require("../assets/arrow_right.svg").default} alt="right arrow" style={{marginLeft: "0px", filter: "brightness(0) saturate(100%) invert(64%) sepia(88%) saturate(3316%) hue-rotate(169deg) brightness(101%) contrast(101%)"}} />
                </a>
                <a className="modern-link" href="/privacy" target="_blank" rel="noreferrer">Privacy Policy
                  <img src={require("../assets/arrow_right.svg").default} alt="right arrow" style={{marginLeft: "0px", filter: "brightness(0) saturate(100%) invert(64%) sepia(88%) saturate(3316%) hue-rotate(169deg) brightness(101%) contrast(101%)"}} />
                </a>
              </div>
              <div className="copyright-text">
                &copy; OpenObserve <span style={{marginLeft: "-0px"}} className="year-text">{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;
