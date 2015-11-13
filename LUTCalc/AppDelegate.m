//
//  AppDelegate.m
//  LUTCalc
//
//  Created by Ben Turley on 04/10/2014.
//  Copyright (c) 2014 Ben Turley. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

@synthesize window;
@synthesize webView;

- (void) awakeFromNib {
    [NSApp setDelegate: self];
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"web/index" withExtension:@"html"];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
    [[[self webView] mainFrame] loadRequest:urlRequest];
    [[self window] setContentView:self.webView];
    [[self window] setTitle:@"LUTCalc"];
    [[NSUserNotificationCenter defaultUserNotificationCenter] setDelegate:(id)self];
}

- (void) webView:(WebView *)sender didClearWindowObject:(WebScriptObject *)windowObject forFrame:(WebFrame *)frame {
    id win = [sender windowScriptObject];
    [win setValue:self forKey:@"lutCalcApp"];
    [win setValue:self forKey:@"appOS"];
    [win setValue:self forKey:@"saveLUT"];
    [win setValue:self forKey:@"saveBIN"];
    [win setValue:self forKey:@"loadLUT"];
    [win setValue:self forKey:@"loadImg"];
    [win setValue:self forKey:@"logOSX"];
}

- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification{
    return YES;
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)theApplication {
    return YES;
}

// Set which methods can interact with Javascript and how

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)selector {
//    NSLog(@"%@ received %@ for '%@'", self, NSStringFromSelector(_cmd), NSStringFromSelector(selector));
    if (selector == @selector(saveLUTToFile:withFileName:withFileExtension:)) {
        return NO;
    } else if (selector == @selector(saveBINToFile:withFileName:withFileExtension:)) {
        return NO;
    } else if (selector == @selector(loadLUTWithExtensions:toDestination:fromObject:goingTo:)) {
        return NO;
    } else if (selector == @selector(loadImgWithExtensions:toDestination:fromObject:goingTo:)) {
        return NO;
    } else if (selector == @selector(logOSXWithText:)) {
        return NO;
    } else if (selector == @selector(appOS)) {
        return NO;
    }
    return YES;
}

+ (BOOL)isKeyExcludedFromWebScript:(const char *)property {
/*
 NSLog(@"%@ received %@ for '%s'", self, NSStringFromSelector(_cmd), property);
 if (strcmp(property, "saveLUT") == 0) {
        return NO;
    } else if (strcmp(property, "saveBIN") == 0) {
        return NO;
    } else if (strcmp(property, "loadLUT") == 0) {
        return NO;
    } else if (strcmp(property, "loadImg") == 0) {
        return NO;
    } else if (strcmp(property, "logOSX") == 0) {
        return NO;
    } else if (strcmp(property, "appOS") == 0) {
        return NO;
    } else {
        return YES;
    }
*/
    return YES;
}

+ (NSString *) webScriptNameForSelector:(SEL)sel {
//    NSLog(@"%@ received %@ with sel='%@'", self, NSStringFromSelector(_cmd), NSStringFromSelector(sel));
    if (sel == @selector(saveLUTToFile:withFileName:withFileExtension:)) {
        return @"saveLUT";
    } else if (sel == @selector(saveBINToFile:withFileName:withFileExtension:)) {
        return @"saveBIN";
    } else if (sel == @selector(loadLUTWithExtensions:toDestination:fromObject:goingTo:)) {
        return @"loadLUT";
    } else if (sel == @selector(loadImgWithExtensions:toDestination:fromObject:goingTo:)) {
        return @"loadImg";
    } else if (sel == @selector(logOSXWithText:)) {
        return @"logOSX";
    } else if (sel == @selector(appOS)) {
        return @"appOS";
    } else {
        return nil;
    }
}

// Methods that interact with the Javascript
- (NSString *) appOS {
    return @"osx";
}
- (BOOL) saveLUTToFile:(NSString *)lutContent withFileName:(NSString *)fileName withFileExtension:(NSString*) fileExtension; {
    __block BOOL succeeded = NO;
    NSString* newName = [[fileName stringByDeletingPathExtension]
                         stringByAppendingPathExtension:fileExtension];
    // Set the default name for the file and show the panel.
    NSSavePanel* panel = [NSSavePanel savePanel];
    [panel setNameFieldStringValue:newName];
    [panel beginSheetModalForWindow:self.window completionHandler:^(NSInteger result){
        if (result == NSFileHandlingPanelOKButton)
        {
            NSURL*  fileURL = [panel URL];
            NSError* error;
            BOOL savedOK = [lutContent writeToURL:fileURL
                                     atomically:YES
                                       encoding:NSUTF8StringEncoding
                                            error:&error];
            if (! savedOK) {
                NSLog(@"File saving failed - %@",[error localizedFailureReason]);
            } else {
                NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                userNotification.title = [NSString stringWithFormat: @"%@ Cube LUT", fileName];
                userNotification.subtitle = @"Saved Successfully";
                [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
                succeeded = YES;
            }
        }
    }];
    return succeeded;
}
- (BOOL) saveBINToFile:(id)lutContent withFileName:(NSString *)fileName withFileExtension:(NSString*) fileExtension; {
    __block BOOL succeeded = NO;
    NSString* newName = [[fileName stringByDeletingPathExtension]
                         stringByAppendingPathExtension:fileExtension];
    // Set the default name for the file and show the panel.
    NSSavePanel* panel = [NSSavePanel savePanel];
    [panel setNameFieldStringValue:newName];
    [panel beginSheetModalForWindow:self.window completionHandler:^(NSInteger result){
        if (result == NSFileHandlingPanelOKButton)
        {
            NSURL*  fileURL = [panel URL];
            NSError* error;
            NSLog(@"%@",lutContent);
            BOOL savedOK = [[self byteArrayToFile:lutContent] writeToURL:fileURL
                                          atomically:NO];
            if (! savedOK) {
                NSLog(@"File saving failed - %@",[error localizedFailureReason]);
            } else {
                NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                userNotification.title = [NSString stringWithFormat: @"%@ Cube LUT", fileName];
                userNotification.subtitle = @"Saved Successfully";
                [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
                succeeded = YES;
            }
        }
    }];
    return succeeded;
}
- (void) loadLUTWithExtensions:(NSString *)fileExtensionsString
                       toDestination:(NSString *)destination
                          fromObject:(NSInteger) parentIdx
                             goingTo:(NSInteger) nextIdx; {
    NSOpenPanel* panel = [NSOpenPanel openPanel];
    NSArray* fileExtensionsLower = [[fileExtensionsString lowercaseString] componentsSeparatedByString: @","];
    NSArray* fileExtensionsUpper = [[fileExtensionsString uppercaseString] componentsSeparatedByString: @","];
    NSArray* fileExtensions = [fileExtensionsLower arrayByAddingObjectsFromArray:fileExtensionsUpper];
    [panel setShowsHiddenFiles:NO];
    [panel setCanCreateDirectories:YES];
    [panel setAllowsMultipleSelection:NO];
    [panel setAllowedFileTypes:fileExtensions];
    [panel beginSheetModalForWindow:self.window completionHandler:^(NSInteger result){
        if (result == NSFileHandlingPanelOKButton)
        {
            NSURL* fileURL = [[panel URLs]objectAtIndex:0];
            NSString* fileName = [[fileURL lastPathComponent] stringByDeletingPathExtension];
            NSString* fileExt = [fileURL pathExtension];
            NSError* error;
            if ([fileExt isEqualToString:@"labin"]) {
                NSData* fileContents = [[NSData alloc] initWithContentsOfURL:fileURL];
                if (fileContents == nil) {
                    NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                    userNotification.title = [fileURL lastPathComponent];
                    userNotification.subtitle = @"Failed to load";
                    [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
                    NSLog(@"File opening failed - %@",[error localizedFailureReason]);
                } else {
                    NSArray *args = [NSArray arrayWithObjects:
                                     fileName,
                                     fileExt,
                                     [self fileToByteArray:fileContents],
                                     destination,
                                     [NSString stringWithFormat: @"%ld", (long)parentIdx],
                                     [NSString stringWithFormat: @"%ld", (long)nextIdx],
                                     nil];
                    id appWindowScript = [[self webView] windowScriptObject];
                    [appWindowScript  callWebScriptMethod:@"loadLUTFromApp" withArguments:args ];
                }
            } else {
                NSString* fileContents = [[NSString alloc]
                                          initWithContentsOfURL:fileURL
                                          encoding:NSUTF8StringEncoding
                                          error:&error];
                if (fileContents == nil) {
                    NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                    userNotification.title = [fileURL lastPathComponent];
                    userNotification.subtitle = @"Failed to load";
                    [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
                    NSLog(@"File opening failed - %@",[error localizedFailureReason]);
                } else {
                    NSArray *args = [NSArray arrayWithObjects:
                                     fileName,
                                     fileExt,
                                     fileContents,
                                     destination,
                                     [NSString stringWithFormat: @"%ld", (long)parentIdx],
                                     [NSString stringWithFormat: @"%ld", (long)nextIdx],
                                     nil];
                    id appWindowScript = [[self webView] windowScriptObject];
                    [appWindowScript  callWebScriptMethod:@"loadLUTFromApp" withArguments:args ];
                }
           }
        }
    }];
}
- (void) loadImgWithExtensions:(NSString *)fileExtensionsString
                 toDestination:(NSString *)destination
                    fromObject:(NSInteger) parentIdx
                       goingTo:(NSInteger) nextIdx; {
    NSOpenPanel* panel = [NSOpenPanel openPanel];
    NSArray* fileExtensionsLower = [[fileExtensionsString lowercaseString] componentsSeparatedByString: @","];
    NSArray* fileExtensionsUpper = [[fileExtensionsString uppercaseString] componentsSeparatedByString: @","];
    NSArray* fileExtensions = [fileExtensionsLower arrayByAddingObjectsFromArray:fileExtensionsUpper];
    [panel setShowsHiddenFiles:NO];
    [panel setCanCreateDirectories:YES];
    [panel setAllowsMultipleSelection:NO];
    [panel setAllowedFileTypes:fileExtensions];
    [panel beginSheetModalForWindow:self.window completionHandler:^(NSInteger result){
        if (result == NSFileHandlingPanelOKButton)
        {
            NSURL* fileURL = [[panel URLs]objectAtIndex:0];
            NSString* fileExt = [fileURL pathExtension];
            NSError* error;
            NSImage * sourceImage = [[NSImage alloc] initWithData:[NSData dataWithContentsOfURL:fileURL]];
            if (sourceImage == nil) {
                NSUserNotification *userNotification = [[NSUserNotification alloc] init];
                userNotification.title = [fileURL lastPathComponent];
                userNotification.subtitle = @"Failed to load";
                [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:userNotification];
                NSLog(@"File opening failed - %@",[error localizedFailureReason]);
            } else {
                NSBitmapImageRep * imageRep = [[NSBitmapImageRep alloc]
                                               initWithBitmapDataPlanes:NULL
                                               pixelsWide:960
                                               pixelsHigh:540
                                               bitsPerSample:16
                                               samplesPerPixel:4
                                               hasAlpha:YES
                                               isPlanar: NO
                                               colorSpaceName:NSCalibratedRGBColorSpace
                                               bytesPerRow: 960 * 4 * 2
                                               bitsPerPixel: 4 * 16
                                               ];
                imageRep = [imageRep bitmapImageRepByRetaggingWithColorSpace:[NSColorSpace sRGBColorSpace]];
                NSGraphicsContext *ctx = [NSGraphicsContext graphicsContextWithBitmapImageRep: imageRep];
                [NSGraphicsContext saveGraphicsState];
                [NSGraphicsContext setCurrentContext: ctx];
                float aspect = [sourceImage size].width / [sourceImage size].height;
                float w = 960;
                float h = 540;
                if (aspect < 16/9){
                    w = 540 * aspect;
                } else {
                    h = 960 / aspect;
                }
                float x = (960 - w)/2;
                float y = (540 - h)/2;
                NSRect imageRect = NSMakeRect(x, y, w, h);
                [sourceImage drawInRect:imageRect
                                fromRect: NSZeroRect
                               operation: NSCompositeCopy
                                fraction: 1.0];
                [ctx flushGraphics];
                [NSGraphicsContext restoreGraphicsState];
                NSUInteger max = 960 * 540;
                NSMutableArray *imageArray = [[NSMutableArray alloc] init];
                struct Pixel { uint16_t r,g,b,a; };
                struct Pixel *pixels = (struct Pixel *) [imageRep bitmapData];
                for (int j=0; j<max; j++) {
                    [imageArray addObject:@(pixels[j].r)];
                    [imageArray addObject:@(pixels[j].g)];
                    [imageArray addObject:@(pixels[j].b)];
                }
                NSArray *args = [NSArray arrayWithObjects:
                                 fileExt,
                                 [[fileURL lastPathComponent] stringByDeletingPathExtension],
                                 imageArray,
                                 destination,
                                 [NSString stringWithFormat: @"%ld", (long)parentIdx],
                                 [NSString stringWithFormat: @"%ld", (long)nextIdx],
                                 nil];
                id appWindowScript = [[self webView] windowScriptObject];
                [appWindowScript  callWebScriptMethod:@"loadImgFromApp" withArguments:args ];
            }
        }
    }];
}
- (NSArray *) fileToByteArray: (NSData *) fileData; {
    NSUInteger len = [fileData length];
    Byte *byteData = (Byte*)malloc(len);
    memcpy(byteData, [fileData bytes], len);
    NSMutableArray *output = [[NSMutableArray alloc] init];
    int j = 0;
    for (j=0; j<len; j++) {
        [output addObject:@(byteData[j])];
    }
    return output;
}
- (NSData *) byteArrayToFile: (id) arrayData; {
    id length = [arrayData valueForKey:@"length"];
    unsigned m = [length isKindOfClass:[NSNumber class]] ? [length unsignedIntValue] : 0;
    NSMutableData *output = [[NSMutableData alloc] initWithCapacity:m];
    unsigned j;
    unsigned char zero = 0;
    for (j = 0; j < m; ++j) {
        unsigned char element = [[arrayData webScriptValueAtIndex:j] unsignedCharValue];
        if (element) {
            [output appendBytes:&element length:sizeof(element)];
        } else {
            [output appendBytes:&zero length:sizeof(zero)];
        }
    }
    return output;
}
- (void) logOSXWithText:(NSString *) logMessage; {
    NSLog(@"%@",logMessage);
}

@end
