package com.fairy_pitt.recordary.endpoint.main;

import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

@Transactional
@Controller
public class MainController {

    @Autowired
    private HttpSession session;
    @Autowired
    private UserService userService;
    @Autowired
    private FollowerService followerService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private GroupMemberService groupmemberService;

}