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
        userService.checkSessionLogout();
        return userService.save(requestDto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserLoginRequestDto requestDto){
        userService.checkSessionLogout();
        return userService.login(requestDto);
    }

    @PostMapping("/logout")
    public Boolean logout(@RequestBody Long userCd){
        return userService.logout(userCd);
    }

    @PutMapping("/{userCd}")
    public Long update(@PathVariable Long userCd, @RequestBody UserUpdateRequestDto requestDto){
        userService.checkSessionLogout();
        return userService.update(userCd, requestDto);
    }

    @PostMapping("/{userCd}/profileUpload")
    public String profileUpload(@PathVariable Long userCd, @RequestParam MultipartFile userPic) throws IOException {
        userService.checkSessionLogout();
        return userService.profileUpload(userCd, userPic);
    }

    @DeleteMapping("/{userCd}")
    public Boolean delete(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return userService.delete(userCd);
    }

    @GetMapping("/{userCd}")
    public UserResponseDto findByCd(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return userService.findByCd(userCd);
    }

    @GetMapping("/profile/{userId}")
    public UserProfileResponseDto getProfile(@PathVariable String userId){
        userService.checkSessionLogout();
        return userService.getProfile(userId);
    }

    @GetMapping("/search")
    public List<UserResponseDto> findNmUser(@RequestParam(value = "input") String inputNm){
        userService.checkSessionLogout();
        return userService.findNmUser(inputNm);
    }

    @GetMapping("/existId/{userId}")
    public Boolean existId(@PathVariable String userId){
        return userService.existId(userId);
    }

    @GetMapping("/sessionInfo")
    public UserResponseDto currentUserInfo(){
        return userService.currentUserInfo();
    }

    @PostMapping("/checkPw")
    public Boolean checkPw(@RequestBody UserLoginRequestDto requestDto){
        return userService.checkPw(requestDto);
    }
}
