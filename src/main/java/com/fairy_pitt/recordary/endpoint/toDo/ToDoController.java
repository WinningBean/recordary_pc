package com.fairy_pitt.recordary.endpoint.toDo;

import com.fairy_pitt.recordary.endpoint.toDo.dto.ToDoResponseDto;
import com.fairy_pitt.recordary.endpoint.toDo.dto.TodoRequestDto;
import com.fairy_pitt.recordary.endpoint.toDo.service.ToDoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("toDo")
@RequiredArgsConstructor
@RestController
public class ToDoController {

    private final ToDoService toDoService;

    @PostMapping("/")
    public Long create(@RequestBody TodoRequestDto requestDto){
        return toDoService.create(requestDto);
    }

    @PostMapping("update/{id}")
    public Boolean update(@PathVariable Long id)
    {
       return toDoService.update(id);
    }

    @GetMapping("{userCd}")
    public List<ToDoResponseDto> getCurrTodoList(@PathVariable Long userCd)
    {
        return toDoService.getCurrTodoList(userCd);
    }

    @GetMapping("pre/{userCd}")
    public List<ToDoResponseDto> getPreTodoList(@PathVariable Long userCd)
    {
        return toDoService.getPreTodoList(userCd);
    }

    @DeleteMapping("{toDoCd}")
    public Boolean delete(@PathVariable Long toDoCd)
    {
        return toDoService.delete(toDoCd);
    }

}