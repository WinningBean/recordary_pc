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

    @PutMapping("/{userCd}")
    public Long update(@PathVariable Long userCd, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(userCd, requestDto);
    }

    @PostMapping("/{userCd}/profileUpload")
    public String profileUpload(@PathVariable Long userCd, @RequestParam MultipartFile userPic) throws IOException {
        return userService.profileUpload(userCd, userPic);
    }

    @DeleteMapping("/{userCd}")
    public Long delete(@PathVariable Long userCd){
        userService.delete(userCd);
        return userCd;
    }

    @GetMapping("/{userCd}")
    public UserResponseDto findById(@PathVariable Long userCd){
        return userService.findByCd(userCd);
    }

    @GetMapping("/profile/{userId}")
    public UserProfileResponseDto getProfile(@PathVariable String userId){
        return userService.getProfile(userId);
    }

    @GetMapping("/search/{inputNm}")
    public List<UserResponseDto> findNmUser(@PathVariable String inputNm){
        return userService.findNmUser(inputNm);
    }

    @GetMapping("/existId/{userId}")
    public Boolean existId(@PathVariable String userId){
        return userService.existId(userId);
    }

    @GetMapping("/currentCd")
    public Long currentUserCd(){
        return userService.currentUserCd();
    }

    @PostMapping("/checkPw")
    public Boolean checkPw(@RequestBody UserLoginRequestDto requestDto){
        return userService.checkPw(requestDto);
    }
}
