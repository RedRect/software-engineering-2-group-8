import React, { Component } from 'react';
import axios from 'axios'
import './SidePanelContent.css';
import { Link } from 'react-router-dom';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

class SidePanelContent extends Component {
    constructor() {
        super();
        this.state = {
            allSkills: [],
            hasSkills: [],
            wantSkills: [],
            openKeys: [],
        };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const userProfile = authService.getProfile();
            const config = {
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authService.getToken(),
                }
            };

            axios.get('/api/skills/all')
            .then(res => res.data)
            .then(data => this.setState({allSkills: data }));

            if (!!userProfile && userProfile.email) {
                axios.get('/api/users/has', config)
                .then(res => res.data.user)
                .then(user => this.setState({ hasSkills: user.has }));

                axios.get('/api/users/wants', config)
                .then(res => res.data.user)
                .then(user => this.setState({ wantSkills: user.wants }));
            }
        }
    }

    render() {
        return (
                <Menu theme="light"
                      mode="inline"
                      openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}
                      style={{ height: '100%'}}>
                    <Menu.Item key="sub1">
                        <Link to="/Profile">
                            <Icon type="user"/> <span>My Profile</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub2" title={<span><Icon type="search" /><span>Find Matches</span></span>}>
						<Menu.Item key="4">
							<Link to="/">
								Perfect Matches
							</Link>
						</Menu.Item>
                        <Menu.Item key="5"
							onClick={ ()=> this.props.params.filtertype }>
							<Link to="/filterHas">
								What I Have
							</Link>
						</Menu.Item>
                        <Menu.Item key="6">
							<Link to="/filterWants">
								What I Want
							</Link>
						</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="book" /><span>Trades</span></span>}>
                        <Menu.Item key="7">
                            <Link to="/trades/active">
                                Active
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/trades/sent">
                                Sent
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/trades/received">
                                Received
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
        );
    }
}

export default SidePanelContent;