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
    public String update(@PathVariable String userId, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(userId, requestDto);
    }

    @PostMapping("/{userId}/profileUpload")
    public String profileUpload(@PathVariable String userId, @RequestParam MultipartFile userPic) throws IOException {
        return userService.profileUpload(userId, userPic);
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
