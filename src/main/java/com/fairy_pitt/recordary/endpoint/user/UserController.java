package com.fairy_pitt.recordary.endpoint.user;

import com.fairy_pitt.recordary.endpoint.user.dto.*;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Transactional
@RequestMapping("user")
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/join")
    public Boolean join(@RequestBody UserSaveRequestDto requestDto){
        return userService.save(requestDto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserLoginRequestDto requestDto){
        return userService.login(requestDto);
    }

    @GetMapping("/logout")
    public Boolean logout(){
        return userService.logout();
    }

    @PutMapping("/{userId}")
    public String settingUpdate(@PathVariable String userId, @RequestBody UserSettingUpdateRequestDto requestDto){
        return userService.settingUpdate(userId, requestDto);
    }

    @PostMapping("/{userId}/profileUpdate")
    public String profileUpdate(@PathVariable String userId, @RequestPart MultipartFile userPic, @RequestPart String userEx) throws IOException {
        return userService.profileUpdate(userId, userPic, userEx);
    }

    @DeleteMapping("/{userId}")
    public String delete(@PathVariable String userId){
        userService.delete(userId);
        return userId;
    }

    @GetMapping("/{userId}")
    public UserResponseDto findById(@PathVariable String userId){
        return userService.findById(userId);
    }

    @GetMapping("/search/{inputNm}")
    public List<UserResponseDto> findNmUser(@PathVariable String inputNm){
        return userService.findNmUser(inputNm);
    }

    @GetMapping("/existId/{userId}")
    public Boolean existId(@PathVariable String userId){
        return userService.existId(userId);
    }

    @GetMapping("/currentId")
    public String currentUserId(){
        return userService.currentUserId();
    }

    @PostMapping("/checkPw")
    public Boolean checkPw(@RequestBody UserLoginRequestDto requestDto){
        return userService.checkPw(requestDto);
    }
}
